import { Schema, model } from 'mongoose';
import { AddressModel } from '../../../../domain/models/address.model';

const addressSchema = new Schema<AddressModel>({
  zipCode: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  complement: {
    type: String,
    required: false,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
});

export const AddressEntity = model<AddressModel>('Address', addressSchema);
