import { Application, Router } from 'express';
import fs from 'fs';

export default (app: Application) => {
  const router = Router();
  app.use(router);

  fs.readdirSync(`${__dirname}/../routes`, { recursive: true }).map(
    async (file) => {
      if (!file.includes('.test.') && file.includes('.routes')) {
        (await import(`../routes/${file}`)).default(router);
      }
    },
  );
};
