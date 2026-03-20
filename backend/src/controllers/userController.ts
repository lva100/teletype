import type { NextFunction, Request, Response } from 'express'
import User from '../models/User'

declare global {
	namespace Express {
		export interface User {
			id: string
		}
	}
}

export async function getUsers(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userId = req.user?.id
		const users = await User.find({ _id: { $ne: userId } })
			.select('firstName lastName email avatarUrl')
			.limit(50)

		res.json(users)
	} catch (error) {
		res.status(500)
		next(error)
	}
}
