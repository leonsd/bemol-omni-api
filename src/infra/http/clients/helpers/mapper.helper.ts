import { Address, ViaCepAddress } from '../viacep-client.protocol';

export const map = (address: ViaCepAddress): Address => {
  return {
    zipCode: address.cep,
    street: address.logradouro,
    complement: address.complemento,
    neighborhood: address.bairro,
    city: address.localidade,
    state: address.uf,
  };
};
