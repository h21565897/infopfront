export interface IUserChannelType {
  email: string;
  message: string;
}
export interface IUserAccount {
  id: number;
  name: string;
  sendChannel: number;
  accountConfig: string;
  isDeleted: number;
  creator: string;
  created: number;
  updated: number;
}
export interface IEmailAccountConfig {
  host: string;
  port: string;
  user: string;
  pass: string;
  from: string;
}
export type IBasicUserAccount = {
  "account-name": string;
  "pushing-channel": keyof IUserChannelType | "";
};
export interface IUserAccountForm
  extends IBasicUserAccount,
    IEmailAccountConfig {}
