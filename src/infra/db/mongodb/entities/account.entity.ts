import { Schema, model } from 'mongoose';
import { AccountModel } from '../../../../domain/models/account.model';

const accountSchema = new Schema<AccountModel>({
  username: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const AccountEntity = model<AccountModel>('Account', accountSchema);
