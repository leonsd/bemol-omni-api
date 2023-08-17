import { Controller, HttpRequest, HttpResponse, Validation } from './add-account.protocol';
import { AddAccount } from '../../../domain/usecases/add-account.usecase';
import { badRequest, conflict, created, serverError } from '../../helpers/http/http.helper';
import { AccountModel } from '../../../domain/models/account.model';

export class AddAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<AccountModel | Error>> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const account = await this.addAccount.execute(httpRequest.body);
      if (!account) {
        return conflict('Email already registered');
      }

      return created(account);
    } catch (error) {
      return serverError();
    }
  }
}
