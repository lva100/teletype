import { Router } from 'express'
import passport from 'passport'
import {
	createUser,
	loginUser,
	refreshToken,
	whoami,
} from '../controllers/authController'
import {
	loginValidationRules,
	refreshTokenValidationRules,
	userValidationRules,
	validate,
} from '../middleware/validator'

const router = Router()

router.post('/register', userValidationRules, validate, createUser)
router.post('/login', loginValidationRules, validate, loginUser)
router.post(
	'/refresh-token',
	refreshTokenValidationRules,
	validate,
	refreshToken,
)
router.get('/me', passport.authenticate(['jwt'], { session: false }), whoami)

export default router
