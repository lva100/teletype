import passport from 'passport'
import PassportHttp from 'passport-http'
import PassportJWT from 'passport-jwt'
import User from '../models/User'
import { comparePassword } from '../utils/helpers'

const options = {
	jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET_KEY || '',
}

passport.use(
	new PassportJWT.Strategy(options, async (payload, done) => {
		try {
			const user = await User.findOne({ _id: payload.id })
			if (user) {
				return done(null, user)
			} else {
				return done(null, false)
			}
		} catch (error) {
			return done(error)
		}
	}),
)

passport.use(
	new PassportHttp.BasicStrategy(async (userid, password, done) => {
		try {
			const user = await User.findOne({ email: userid })
			if (!user) {
				return done(null, false)
			}
			const isPasswordCorrect = await comparePassword(password, user.password)
			if (!isPasswordCorrect) {
				return done(null, false)
			}
			return done(null, user)
		} catch (error) {
			return done(error)
		}
	}),
)

export default passport
