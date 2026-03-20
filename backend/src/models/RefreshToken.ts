import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const refreshTokenSchema = new mongoose.Schema(
	{
		token: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		expiryDate: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true },
)

refreshTokenSchema.plugin(uniqueValidator)

export default mongoose.model('RefreshToken', refreshTokenSchema)
