import type { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const userValidationRules = [
	body('email').notEmpty().isEmail(),
	body('firstName').notEmpty().isString(),
	body('lastName').notEmpty().isString(),
	body('password').notEmpty().isString(),
]

export const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req)
	const errorsArray: {}[] = []
	errors.array().map(err =>
		errorsArray.push({
			[err.type == 'field' ? err.path : err.type]: err.msg,
		}),
	)
	if (errors.isEmpty()) {
		return next()
	}
	return res.status(422).json({ errors: errorsArray })
}

export const loginValidationRules = [
	body('email').notEmpty().isEmail(),
	body('password').notEmpty().isString(),
]

export const refreshTokenValidationRules = [
	body('refreshToken').notEmpty().isUUID(),
]
