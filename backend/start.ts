import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './config/db.config.ts';

import userRoutes from './routes/user.routes.ts';
import authRoutes from './routes/auth.routes.ts';
import placeRoutes from './routes/place.routes.ts';
import reviewRoutes from './routes/review.routes.ts';

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
