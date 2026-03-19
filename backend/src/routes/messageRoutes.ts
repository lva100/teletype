import { Router } from 'express'
import passport from 'passport'
import { getMessages } from '../controllers/messageController'

const router = Router()

router.get(
	'/chat/:chatId',
	passport.authenticate(['jwt'], { session: false }),
	getMessages,
)

export default router
