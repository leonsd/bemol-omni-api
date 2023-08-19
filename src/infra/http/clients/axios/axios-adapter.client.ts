import axios from 'axios';
import { HttpClient } from '../../../../data/protocols/http/client';

export class AxiosAdapter implements HttpClient {
  async get<T>(uri: string): Promise<T> {
    const response = await axios.get<T>(uri);
    return response.data;
  }
}
