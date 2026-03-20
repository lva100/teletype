import type { NextFunction, Request, Response } from 'express'
import { Server as HttpServer } from 'http'
import passport from 'passport'
import { Server as SocketServer } from 'socket.io'
import Chat from '../models/Chat'
import Message from '../models/Message'

declare module 'http' {
	interface IncomingMessage {
		user: any
	}
}

// store online users in memory: userId -> socketId
export const onlineUsers: Map<string, string> = new Map()

export const initializeSocket = (httpServer: HttpServer) => {
	const allowedOrigins = [
		'http://localhost:8081', // Expo mobile
		'http://localhost:5173', // Vite web dev
		process.env.FRONTEND_URL, // production
	].filter(Boolean) as string[]

	const io = new SocketServer(httpServer, { cors: { origin: allowedOrigins } })

	io.engine.use((req: Request, res: Response, next: NextFunction) => {
		const isHandshake = req.query.sid == undefined
		if (isHandshake) {
			passport.authenticate(['jwt'], { session: false })(req, res, next)
		} else {
			next()
		}
	})

	// verify socket connection - if the user is authenticated, we will store the user id in the socket

	io.use(async (socket, next) => {
		//const token = socket.handshake.auth.token // this is what user will send from client
		const user = socket.request.user

		/*if (!token) return next(new Error('Authentication error'))*/

		try {
			/*const session = await verifyToken(token, {
				secretKey: process.env.SECRET_KEY!,
			})

			const clerkId = session.sub

			const user = await User.findOne({ clerkId })
			if (!user) return next(new Error('User not found'))*/

			socket.data.userId = user._id.toString()

			next()
		} catch (error: any) {
			next(new Error(error))
		}
	})

	// this "connection" event name is special and should be written like this
	// it's the event that is triggered when a new client connects to the server
	io.on('connection', socket => {
		const userId = socket.data.userId //const user = socket.request.user

		// send list of currently online users to the newly connected client
		socket.emit('online-users', { userIds: Array.from(onlineUsers.keys()) })

		// store user in the onlineUsers map
		onlineUsers.set(userId, socket.id)

		// notify others that this current user is online
		socket.broadcast.emit('user-online', { userId })

		socket.join(`user:${userId}`)

		socket.on('join-chat', (chatId: string) => {
			socket.join(`chat:${chatId}`)
		})

		socket.on('leave-chat', (chatId: string) => {
			socket.leave(`chat:${chatId}`)
		})

		// handle sending messages
		socket.on(
			'send-message',
			async (data: { chatId: string; text: string }) => {
				try {
					const { chatId, text } = data

					const chat = await Chat.findOne({
						_id: chatId,
						participants: userId,
					})

					if (!chat) {
						socket.emit('socket-error', { message: 'Chat not found' })
						return
					}

					const message = await Message.create({
						chat: chatId,
						sender: userId,
						text,
					})

					chat.lastMessage = message._id
					chat.lastMessageAt = new Date()
					await chat.save()

					await message.populate('sender', 'name avatar')

					// emit to chat room (for users inside the chat)
					io.to(`chat:${chatId}`).emit('new-message', message)

					// also emit to participants' personal rooms (for chat list view)
					for (const participantId of chat.participants) {
						io.to(`user:${participantId}`).emit('new-message', message)
					}
				} catch (error) {
					socket.emit('socket-error', { message: 'Failed to send message' })
				}
			},
		)

		socket.on('typing', async (data: { chatId: string; isTyping: boolean }) => {
			const typingPayload = {
				userId,
				chatId: data.chatId,
				isTyping: data.isTyping,
			}

			// emit to chat room (for users inside the chat)
			socket.to(`chat:${data.chatId}`).emit('typing', typingPayload)

			// also emit to other participant's personal room (for chat list view)
			try {
				const chat = await Chat.findById(data.chatId)
				if (chat) {
					const otherParticipantId = chat.participants.find(
						(p: any) => p.toString() !== userId,
					)
					if (otherParticipantId) {
						socket
							.to(`user:${otherParticipantId}`)
							.emit('typing', typingPayload)
					}
				}
			} catch (error) {
				// silently fail - typing indicator is not critical
			}
		})

		socket.on('disconnect', () => {
			onlineUsers.delete(userId)

			// notify others
			socket.broadcast.emit('user-offline', { userId })
		})
	})

	return io
}
