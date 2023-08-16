import { Request, Response } from 'express';
import { Controller } from '../../../presentation/protocols/controller.protocol';
import { HttpRequest } from '../../../presentation/protocols/http.protocol';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      params: req.params,
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);

    return res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
