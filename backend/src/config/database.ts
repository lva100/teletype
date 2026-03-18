import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
		const mongoUri = process.env.MONGODB_URI
		if (!mongoUri) {
			throw new Error('MONGODB_URI environment variable is not defined')
		}

		await mongoose.connect(mongoUri)
		console.log('✅ MongoDB connected successfully')
	} catch (error) {
		console.error('❌ MongoDB connection error:', error)
		process.exit(1) // exit with failure
		// status code 1 means failure
		// status code 0 means success
	}
}
