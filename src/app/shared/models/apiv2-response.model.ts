export interface Apiv2ResponseModel<T> {
  message: string;
  model?: T;
  data?: T;
}
