import type { NextFunction, Request, Response } from 'express'
import Chat from '../models/Chat'

export async function getChats(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userId = req.user?.id

		const chats = await Chat.find({ participants: userId })
			.populate('participants', 'firstName lastName email avatarUrl')
			.populate('lastMessage')
			.sort({ lastMessageAt: -1 })

		const formattedChats = chats.map(chat => {
			const otherParticipant = chat.participants.find(
				p => p._id.toString() != userId,
			)

			return {
				_id: chat._id,
				participant: otherParticipant,
				lastMessage: chat.lastMessage,
				lastMessageAt: chat.lastMessageAt,
				createdAt: chat.createdAt,
			}
		})
		res.json(formattedChats)
	} catch (error) {
		res.status(500)
		next(error)
	}
}

export async function getOrCreateChat(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userId = req.user?.id
		const { participantId } = req.params

		//check if chat already exists
		let chat = await Chat.findOne({
			participants: { $all: [userId, participantId] },
		})
			.populate('participants', 'firstName lastName email avatarUrl')
			.populate('lastMessage')

		if (!chat) {
			const newChat = new Chat({ participants: [userId, participantId] })
			await newChat.save()
			chat = await newChat.populate(
				'participants',
				'firstName lastName email avatarUrl',
			)
		}
		const otherParticipant = chat.participants.find(
			p => p._id.toString() != userId,
		)
		res.json({
			_id: chat._id,
			participant: otherParticipant ?? null,
			lastMessage: chat.lastMessage,
			lastMessageAt: chat.lastMessageAt,
			createdAt: chat.createdAt,
		})
	} catch (error) {
		res.status(500)
		next(error)
	}
}
