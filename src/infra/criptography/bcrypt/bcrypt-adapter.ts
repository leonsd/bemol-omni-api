import { hash } from 'bcrypt';
import { Hasher } from '../../../data/protocols/criptography/hasher';

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hashedValue = await hash(value, this.salt);
    return hashedValue;
  }
}
