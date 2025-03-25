import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './config/db.config';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import placeRoutes from './routes/place.routes';
import reviewRoutes from './routes/review.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// use routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => {
	  console.log(`Server is running on port ${PORT}`);
})