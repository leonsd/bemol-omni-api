import { Router } from 'express';
import { makeAddAccountController } from '../../factories/account/account.factory';
import { adaptRoute } from '../../adapters/express/express-routes-json.adapter';

export default (router: Router): void => {
  const controller = makeAddAccountController();
  router.post('/accounts', adaptRoute(controller));
};
