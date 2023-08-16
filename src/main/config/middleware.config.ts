import { Application } from 'express';
import { bodyParser, cors, contentType } from '../middlewares';

export default (app: Application) => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
