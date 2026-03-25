import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import RefreshToken from '../models/RefreshToken'

const saltRounds = 10

jwt.verify

export async function hashPassword(password: string) {
	const salt = await bcrypt.genSalt(saltRounds)
	const passwordHash = await bcrypt.hash(password, salt)
	return passwordHash
}

export async function comparePassword(password: string, hashPassword: string) {
	return await bcrypt.compare(password, hashPassword)
}

export function issueAccessToken(payload: {}) {
	return jwt.sign(payload, process.env.SECRET_KEY || '', {
		expiresIn: '15MINUTES',
	}) //2 mins validity
}

export async function createRefreshToken(userId: string) {
	let expiryDate = new Date()
	expiryDate.setSeconds(60 * 60 * 24) //24 hours validity

	const token = uuidv4()
	const refreshToken = await RefreshToken.create({
		token,
		user: userId,
		expiryDate: expiryDate.getTime(),
	})
	return refreshToken.token
}

export function verifyRefreshTokenExpiration(token: {
	token: string
	user: string
	expiryDate: Date
}) {
	return token.expiryDate.getTime() < new Date().getTime()
}

/*module.exports = {
	hashPassword,
	comparePassword,
}*/
