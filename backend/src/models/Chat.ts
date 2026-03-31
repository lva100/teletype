import mongoose, { Schema, type Document } from 'mongoose'

export interface IChat extends Document {
	particiants: mongoose.Types.ObjectId[]
	lastMessage?: mongoose.Types.ObjectId
	lastMessageAt?: Date
	createdAt: Date
	updatedAt: Date
}

const ChatSchema = new Schema<IChat>(
	{
		particiants: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		],
		lastMessage: {
			type: Schema.Types.ObjectId,
			ref: 'Message',
			default: null,
		},
		lastMessageAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
)

export default mongoose.model('Chat', ChatSchema)
