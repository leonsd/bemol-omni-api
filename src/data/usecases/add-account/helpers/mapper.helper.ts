import { AccountModel } from '../add-account.protocol';

export const map = (account: AccountModel) => {
  return {
    id: account.id,
    username: account.username,
    gender: account.gender,
    email: account.email,
  };
};
