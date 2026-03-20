import { Router } from 'express'
import passport from 'passport'
import { getChats, getOrCreateChat } from '../controllers/chatController'

const router = Router()

router.use(passport.authenticate(['jwt'], { session: false }))

router.get('/', getChats)
router.post('/with/particiantId:', getOrCreateChat)

export default router
