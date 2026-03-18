import express from 'express'
import authRoutes from './routes/authRoutes'
import chatRoutes from './routes/chatRoutes'
import messageRoutes from './routes/messageRoutes'
import userRoutes from './routes/userRoutes'

const app = express()

const PORT = process.env.PORT || 3000

app.get('/health', (req, res) => {
	res.json({ status: 'ok', message: 'Server is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

export default app
