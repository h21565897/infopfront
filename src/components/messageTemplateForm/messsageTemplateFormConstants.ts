import {
  receiverIdTypeObj,
  messageTypeObj,
  shieldTypeObj,
  sendChannelTypeObj,
  SendChannelTypesObjType,
  ReceiverTypesObjType,
  MessageTypesObjType,
  ShieldTypesObjType,
} from "@/common/types/messageTemplateFormTypes";
import * as yup from "yup";

export const receiverIdTypeRadios = {
  groupName: "receiver-id-type",
  labelName: "Receiver ID Type",
  radioNames: receiverIdTypeObj,
} as const;
export const messageTypeRadios = {
  groupName: "message-type",
  labelName: "Message Type",
  radioNames: messageTypeObj,
} as const;
export const muteTypeRadios = {
  groupName: "mute-type",
  labelName: "Mute Type",
  radioNames: shieldTypeObj,
} as const;
export const sendChannelTypeRadios = {
  groupName: "channel-info",
  labelName: "Channel Info",
  radioNames: sendChannelTypeObj,
} as const;
export const createValidateSchema = (
  channelType: keyof SendChannelTypesObjType
) => {
  const basicFields = {
    name: yup.string().required("Required"),
    prosper: yup.string().required("Required"),
    [receiverIdTypeRadios.groupName]: yup.string().required("Required"),
    [messageTypeRadios.groupName]: yup.string().required("Required"),
    [muteTypeRadios.groupName]: yup.string().required("Required"),
    [sendChannelTypeRadios.groupName]: yup.string().required("Required"),
  };
  const emailFields = {
    "channel-account": yup.number().required("Required"),
    "email-title": yup.string().required("Required"),
    "email-content": yup.string().required("Required"),
  };
  const messageFields = {
    "channel-account": yup.number().required("Required"),
    "message-content": yup.string().required("Required"),
    "message-title": yup.string().required("Required"),
  };
  return yup.object().shape({
    ...basicFields,
    ...(channelType === "email" ? emailFields : {}),
    ...(channelType === "message" ? messageFields : {}),
  });
};

export interface IEmail {
  "channel-account": number;
  "email-title": string;
  "email-content": string;
}
export interface IMessage {
  "channel-account": number;
  "message-content": string;
  "message-title": string;
}
export type FormValueType = {
  name: string;
  prosper: string;
  [receiverIdTypeRadios.groupName]: keyof ReceiverTypesObjType | "";
  [messageTypeRadios.groupName]: keyof MessageTypesObjType | "";
  [muteTypeRadios.groupName]: keyof ShieldTypesObjType | "";
  [sendChannelTypeRadios.groupName]: keyof SendChannelTypesObjType | "";
};
export type IEmailFormValueType = FormValueType & IEmail;
export interface IMessageFormValueType extends FormValueType, IMessage {}
export type AllFormValueTypes =
  | IEmailFormValueType
  | IMessageFormValueType
  | FormValueType;
export interface flattenedFormValueType
  extends IEmailFormValueType,
    IMessageFormValueType {}
