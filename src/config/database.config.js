import mongoose from 'mongoose';
import logger from './logger.config.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test-api';

export default async function connectDB() {
	try {
		await mongoose.connect(MONGODB_URI);
		logger.warn('MongoDB connected');
	} catch (error) {
		logger.error('MongoDB connection error:', err);
		process.exit(1);
	}
}
