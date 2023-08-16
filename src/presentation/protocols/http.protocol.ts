export interface HttpRequest<T = any, U = any> {
  params?: U;
  body?: T;
}

export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
}
