import { MongoHelper } from '../infra/db/mongodb/helpers/mongo.helper';
import { env } from './config/env.config';

const uri = env.mongoUrl;
MongoHelper.connect(uri)
  .then(async () => {
    const app = (await import('./config/app.config')).default;
    app.listen(env.port, () => console.log(`Server started in port ${env.port}`));
  })
  .catch((error) => {
    console.error(error);
  });
