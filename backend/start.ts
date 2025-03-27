import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './config/db.config';
import Log from './config/log.config';
import { setupAssociations } from "./model/associations";

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import businessRoutes from './routes/business.routes';
import reviewRoutes from './routes/review.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const logger = new Log().getLogger();

app.use(cors());
app.use(bodyParser.json());

// use routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/reviews', reviewRoutes);

setupAssociations();
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ alter: true })
    .then(() => {
      logger.info('✅ Base de données synchronisée');
      app.listen(PORT, () => {
        logger.info(`🚀 Serveur démarré sur le port ${PORT}`);
      });
    })
    .catch((err) => {
      logger.error('❌ Erreur lors de la synchronisation de la base de données :', err);
    });
}

export default app;