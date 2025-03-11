import logger from '../config/logger.config.js';
import Product from '../models/product.model.js';
import connectDB from '../config/database.config.js';

import frutasJSON from './frutas.json' with { "type": "json" };
import verdurasJSON from './verduras.json' with { "type": "json" };

async function seed() {
	try {
		await connectDB();
		logger.warn('Connected to DB');
		await Product.deleteMany({});
		logger.warn('Products collection cleared');
		await Product.insertMany(frutasJSON);
		logger.info('Fruits inserted successfully');
		await Product.insertMany(verdurasJSON);
		logger.info('Vegetables inserted successfully');
		process.exit(0);
	} catch (error) {
		logger.error('Error seeding data:', error);
		process.exit(1);
	}
}

seed();
