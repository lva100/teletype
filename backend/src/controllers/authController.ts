/*import RefreshToken from '../models/RefreshToken'
import User from '../models/User'
*/
import {
	comparePassword,
	createRefreshToken,
	hashPassword,
	issueAccessToken,
} from '../utils/helpers'

import type { NextFunction, Request, Response } from 'express'
import type {
	AuthRequest,
	LoginUserDTO,
	RegisterUserDTO,
} from '../middleware/auth'
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
		const accessToken = issueAccessToken(payload)
		const refreshToken = await createRefreshToken(user.id)
		res.status(200).json({
			accessToken,
			refreshToken,
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

async function refreshToken(req, res) {
	const { refreshToken: refreshTokenUUID } = req.body

	const refreshToken = await RefreshToken.findOne({
		token: refreshTokenUUID,
	}).populate('user')

	if (!refreshToken) {
		return res.status(404).json({ error: 'invalid refresh token' })
	}

	const isExpired = verifyRefreshTokenExpiration(refreshToken)

	if (isExpired) {
		await RefreshToken.findByIdAndDelete(refreshToken._id).exec()
		return res.status(403).json({ error: 'Refresh token is expired' })
	}

	const payload = {
		email: refreshToken.user.email,
		id: refreshToken.user.id,
	}
	await RefreshToken.findByIdAndDelete(refreshToken._id).exec()

	const newAccessToken = issueAccessToken(payload)
	const newRefreshToken = await createRefreshToken(payload.id)

	return res.status(200).json({
		accessToken: newAccessToken,
		refreshToken: newRefreshToken,
	})
}

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
