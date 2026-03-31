/*import RefreshToken from '../models/RefreshToken'
import User from '../models/User'
*/
import {
	comparePassword,
	createRefreshToken,
	hashPassword,
	issueAccessToken,
	verifyRefreshTokenExpiration,
} from '../utils/helpers'

import type { NextFunction, Request, Response } from 'express'
import type { ObjectId } from 'mongoose'
import type {
	AuthRequest,
	LoginUserDTO,
	RegisterUserDTO,
} from '../middleware/auth'
import RefreshToken from '../models/RefreshToken'
import User from '../models/User'

export async function getMe(req: AuthRequest, res: Response) {
	// return res.status(200).json(req.user)
	try {
		const userId = req.userId
	} catch (error) {}
}

export async function createUser(
	req: Request<never, never, RegisterUserDTO, never>,
	res: Response,
	next: NextFunction,
) {
	try {
		const { email, password, firstName, lastName } = req.body
		const passwordHash = await hashPassword(password)
		const user = await User.create({
			email,
			firstName,
			lastName,
			password: passwordHash,
			avatarUrl: '/images/avatar-male.svg',
			lastLogin: new Date(),
		})

		res.status(201).json(user)
	} catch (error) {
		res.status(500)
		next(error)
	}
}

export async function loginUser(
	req: Request<never, never, LoginUserDTO, never>,
	res: Response,
	next: NextFunction,
) {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			res.status(401).json({ error: 'Invalid Email' })
			return
		}
		const isPasswordCorrect = await comparePassword(password, user.password)
		if (!isPasswordCorrect) {
			res.status(401).json({ error: 'Invalid Password' })
			return
		}
		const payload = {
			email: user.email,
			id: user.id,
		}

		const oldRefreshToken = await RefreshToken.findOne({
			user: user.id,
		})

		if (oldRefreshToken) {
			await RefreshToken.findByIdAndDelete(oldRefreshToken._id).exec()
		}

		const accessToken = issueAccessToken(payload)
		const refreshToken = await createRefreshToken(user.id)

		const expireCookie = 7 * 24 * 60 * 60 * 1000

		res.cookie('refreshToken', refreshToken, {
			maxAge: expireCookie, // срок жизни в мс (1 час)
			expires: new Date(Date.now() + expireCookie), // абсолютная дата истечения
			path: '/', // путь, для которого действует куки
			// domain: 'example.com', // домен (включая поддомены)
			secure: false, // только HTTPS
			httpOnly: true, // недоступно через JavaScript (защита от XSS)
			sameSite: 'lax', // защита от CSRF ('strict', 'lax', 'none')
			// signed: true, // подпись куки (требуется настройка secret)
		})

		res.status(200).json({
			userId: payload.id,
			accessToken,
			// refreshToken,
		})
	} catch (error) {
		res.status(500)
		next(error)
	}
}
export async function whoami(req: Request, res: Response) {
	return res.status(200).json(req.user)
}
/*
export async function listUsers(req, res) {
	const users = await User.find({}).exec()
	return res.status(200).json(users)
}
*/
export async function refreshToken(req: Request, res: Response) {
	const { refreshToken: refreshTokenUUID } = req.body

	const refreshTokenRaw = await RefreshToken.findOne({
		token: refreshTokenUUID,
	}).populate<{ user: { id: ObjectId; email: string } }>('user', 'email')

	// console.log(refreshTokenRaw)

	if (!refreshTokenRaw) {
		return res.status(404).json({ error: 'invalid refresh token' })
	}

	const rfToken = {
		token: refreshTokenRaw.token,
		user: refreshTokenRaw.user?.id.toString() || '',
		expiryDate: refreshTokenRaw.expiryDate,
	}

	const isExpired = verifyRefreshTokenExpiration(rfToken)

	if (isExpired) {
		await RefreshToken.findByIdAndDelete(refreshTokenRaw._id).exec()
		return res.status(403).json({ error: 'Refresh token is expired' })
	}

	const payload = {
		email: refreshTokenRaw.user?.email,
		id: refreshTokenRaw.user?.id,
	}
	await RefreshToken.findByIdAndDelete(refreshTokenRaw._id).exec()

	const newAccessToken = issueAccessToken(payload)
	const newRefreshToken = await createRefreshToken(payload.id?.toString() || '')

	return res.status(200).json({
		accessToken: newAccessToken,
		refreshToken: newRefreshToken,
		userId: payload.id,
	})
}
/*
async function whoami(req, res) {
	return res.status(200).json(req.user)
}

module.exports = {
	createUser,
	listUsers,
	loginUser,
	whoami,
	refreshToken,
}
*/
