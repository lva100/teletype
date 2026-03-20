import { Router } from 'express'
import passport from 'passport'
import { getUsers } from '../controllers/userController'

const router = Router()

router.get('/', passport.authenticate(['jwt'], { session: false }), getUsers)

export default router
