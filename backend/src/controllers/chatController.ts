import type { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import Chat from '../models/Chat'

export async function getChats(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userId = req.user?.id

		const chats = await Chat.find({ particiants: userId })
			.populate('particiants', 'firstName lastName email avatarUrl')
			.populate('lastMessage')
			.sort({ lastMessageAt: -1 })

		const formattedChats = chats.map(chat => {
			const otherParticiant = chat.particiants.find(
				p => p._id.toString() != userId,
			)

			return {
				_id: chat._id,
				participant: otherParticiant ?? null,
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

		const { particiantId } = req.params

		if (!particiantId) {
			res.status(400).json({ message: 'Participant ID is requred' })
			return
		}

		if (!Types.ObjectId.isValid(particiantId.toString())) {
			res.status(400).json({ message: 'Invalid participant ID' })
			return
		}

		if (userId == particiantId) {
			res.status(400).json({ error: 'Cannot create chat with youself' })
			return
		}

		//check if chat already exists
		let chat = await Chat.findOne({
			particiants: { $all: [userId, particiantId] },
		})
			.populate('participants', 'firstName lastName email avatarUrl')
			.populate('lastMessage')

		if (!chat) {
			const newChat = new Chat({ particiants: [userId, particiantId] })
			await newChat.save()
			chat = await newChat.populate(
				'particiants',
				'firstName lastName email avatarUrl',
			)
		}
		const otherParticiant = chat.particiants.find(
			p => p._id.toString() != userId,
		)
		res.json({
			_id: chat._id,
			participant: otherParticiant ?? null,
			lastMessage: chat.lastMessage,
			lastMessageAt: chat.lastMessageAt,
			createdAt: chat.createdAt,
		})
	} catch (error) {
		res.status(500)
		next(error)
	}
}
