import express from 'express';
import { userRoutes } from './user.routes';

export const routes = express.Router();

routes.use(userRoutes);