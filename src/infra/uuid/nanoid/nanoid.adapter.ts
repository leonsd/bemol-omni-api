import { nanoid } from 'nanoid';
import { Shortener } from '../../../data/protocols/uuid/shortener.protocol';

export class NanoidAdapter implements Shortener {
  shorten(size = 6): string {
    return nanoid(size);
  }
}
