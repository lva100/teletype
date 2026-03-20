import express from 'express'
import morgan from 'morgan'

// import openapi docs
import swaggerUi from 'swagger-ui-express'

import { errorHandler } from './middleware/errorHandler'
import passport from './middleware/passport'
import authRoutes from './routes/authRoutes'
import chatRoutes from './routes/chatRoutes'
import messageRoutes from './routes/messageRoutes'
import userRoutes from './routes/userRoutes'

import path from 'path'
import notFoundMiddleware from './middleware/notFound'
import * as swaggerDocumentAuth from './swagger/auth/openapi.json'

const PORT = process.env.PORT || 3000

/*const options = {
	failOnErrors: true,
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'JWT Auth',
			version: '1.0.0',
			description: 'JWT authentication app built using Express and MongoDB',
		},
		components: {
			securitySchemes: {
				basicAuth: {
					type: 'http',
					scheme: 'basic',
				},
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				basicAuth: [],
				bearerAuth: [],
			},
		],
		servers: [
			{
				url: `http://localhost:${PORT}`,
				description: 'Development server',
			},
		],
	},
	apis: ['./routes/*.ts'],
}
*/
// const openapiSpecification = swaggerJsdoc(swaggerDocument)

const app = express()

app.get('/health', (req, res) => {
	res.json({ status: 'ok', message: 'Server is running' })
})

app.use(express.static('public'))
app.use(passport.initialize())
app.use(morgan('common'))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use('/api/auth/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentAuth)) //swagger ui docs routes

app.use(errorHandler)
app.use(notFoundMiddleware)

// serve frontend in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../../web/dist')))

	app.get('/{*any}', (_, res) => {
		res.sendFile(path.join(__dirname, '../../web/dist/index.html'))
	})
}

export default app
