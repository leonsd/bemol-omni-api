import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  AccountWithAddressModel,
  AddAccount,
} from './add-account.protocol';
import { badRequest, conflict, created, serverError } from '../../helpers/http/http.helper';

export class AddAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<AccountWithAddressModel | Error>> {
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
