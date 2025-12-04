import path from 'path';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.use(errorHandler);

export default app;
