import type { NextFunction, Request, Response } from 'express'
import Chat from '../models/Chat'
import Message from '../models/Message'

export async function getMessages(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userId = req.user?.id
		const { chatId } = req.params
		const chat = await Chat.findOne({
			_id: chatId,
			participants: chatId,
		})

		if (!chat) {
			res.status(404).json({ message: 'Chat not found' })
			return
		}

		const messages = await Message.find({ chat: chatId })
			.populate('sender', 'firstName lastName email avatarUrl')
			.sort({ createdAt: 1 })

		res.json(messages)
	} catch (error) {
		res.status(500)
		next(error)
	}
}
