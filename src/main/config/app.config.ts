import express from 'express';
import setupMiddlewares from './middleware.config';
import setupRoutes from './router.config';

const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;
