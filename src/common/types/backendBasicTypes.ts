export interface IResponseMessage<T> {
  status: string;
  msg: string;
  data: T;
}
export interface IDefaultResponseData {
  code: string;
  msg: string;
}
export interface ISendResponse {
  code: string;
  msg: string;
}
