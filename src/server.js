import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/database.config.js';
import productRoutes from './routes/product.routes.js';
import logger from './config/logger.config.js';

const PORT = process.env.PORT || 4000;

const app = express();

connectDB();

app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/v1/', productRoutes);

app.listen(PORT, () => {
	logger.warn(`Server running on port ${PORT}`);
});
