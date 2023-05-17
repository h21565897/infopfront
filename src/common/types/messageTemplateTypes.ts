export * from "./messageTemplateFormTypes";
export interface IMessageTemplate {
  id?: number;
  name: string;
  proposer: string;
  auditStatus?: number;
  flowId?: number;
  msgStatus?: number;
  cronTaskId?: number;
  cronCrowdPath?: string;
  expect_push_time?: string;
  idType: string;
  sendChannel: string;
  templateType: number;
  msgType: string;
  shieldType: string;
  msgContent: string;
  sendAccount: number;
  creator?: string;
  updator?: string;
  auditor?: string;
}
export type FlattenConfig<T> = {
  [K in keyof T]: T[K] extends object ? FlattenConfig<T[K]> : T[K];
};
