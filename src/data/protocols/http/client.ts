export interface HttpClient {
  get<T>(uri: string): Promise<T | null>;
}
