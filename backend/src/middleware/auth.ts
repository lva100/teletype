import { getAuth, requireAuth } from '@clerk/express'
import type { NextFunction, Request, Response } from 'express'
import UserModel from '../models/User'

export type AuthRequest = Request & {
	userId?: string
}

export const protectRoute = [
	requireAuth(),
	async (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			const { userId: clerkId } = getAuth(req)
			// since we call requireAuth() this if check is not necessary
			// if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

			const user = await UserModel.findOne({ clerkId })
			if (!user) return res.status(404).json({ message: 'User not found' })

			req.userId = user._id.toString()

			next()
		} catch (error) {
			res.status(500)
			next(error)
		}
	},
]

export type LoginUserDTO = {
	email: string
	password: string
}

export type RegisterUserDTO = LoginUserDTO & {
	firstName: string
	lastName: string
}

export type ActiveUserDTO = {
	user: {
		id: string
	}
}
