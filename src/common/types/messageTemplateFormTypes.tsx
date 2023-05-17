import { number, string } from "yup";

export const sendChannelTypes = [
  {
    label: "push",
    value: "20",
  },
  {
    label: "message",
    value: "30",
  },
  {
    label: "email",
    value: "40",
  },
  {
    label: "wechat",
    value: "50",
  },
] as const;
export const receiverIdTypes = [
  {
    label: "userId",
    value: "10",
  },
  {
    label: "deviceId",
    value: "20",
  },
  {
    label: "phoneNumber",
    value: "30",
  },
  {
    label: "openID",
    value: "40",
  },
  {
    label: "emailAddress",
    value: "50",
  },
] as const;
export const messageTypes = [
  {
    label: "inform",
    value: "10",
  },
  {
    label: "verify",
    value: "20",
  },
] as const;
export const shieldTypes = [
  {
    label: "unmute",
    value: "10",
  },
  {
    label: "mute",
    value: "20",
  },
] as const;

export type SendChannelTypesObjType = {
  [prop in typeof sendChannelTypes[number]["label"]]: string;
};
export type ReceiverTypesObjType = {
  [prop in typeof receiverIdTypes[number]["label"]]: string;
};
export type MessageTypesObjType = {
  [prop in typeof messageTypes[number]["label"]]: string;
};
export type ShieldTypesObjType = {
  [prop in typeof shieldTypes[number]["label"]]: string;
};
let sendChannelTypeObj: SendChannelTypesObjType = {
  push: "20",
  message: "30",
  email: "40",
  wechat: "50",
};
sendChannelTypes.forEach((value) => {
  sendChannelTypeObj[value["label"]] = value.value;
});
let receiverIdTypeObj: ReceiverTypesObjType = {
  userId: "10",
  deviceId: "20",
  phoneNumber: "30",
  openID: "40",
  emailAddress: "50",
};
receiverIdTypes.forEach((value) => {
  receiverIdTypeObj[value["label"]] = value.value;
});
let messageTypeObj: MessageTypesObjType = {
  inform: "10",
  verify: "20",
};
messageTypes.forEach((value) => {
  messageTypeObj[value["label"]] = value.value;
});
let shieldTypeObj: ShieldTypesObjType = {
  unmute: "10",
  mute: "20",
};
shieldTypes.forEach((value) => {
  shieldTypeObj[value["label"]] = value.value;
});
export const getSendChannelNameById = (
  id: string
): keyof SendChannelTypesObjType | "" => {
  for (const key in sendChannelTypeObj) {
    if (sendChannelTypeObj[key as keyof SendChannelTypesObjType] == id) {
      return key as keyof SendChannelTypesObjType;
    }
  }
  return "";
};
export const getReceiverIdNameById = (
  id: string
): keyof ReceiverTypesObjType | "" => {
  for (const key in receiverIdTypeObj) {
    if (receiverIdTypeObj[key as keyof ReceiverTypesObjType] == id) {
      return key as keyof ReceiverTypesObjType;
    }
  }
  return "";
};
export const getMessageTypeNameById = (
  id: string
): keyof MessageTypesObjType | "" => {
  for (const key in messageTypeObj) {
    if (messageTypeObj[key as keyof MessageTypesObjType] == id) {
      return key as keyof MessageTypesObjType;
    }
  }
  return "";
};
export const getShieldTypeNameById = (
  id: string
): keyof ShieldTypesObjType | "" => {
  for (const key in shieldTypeObj) {
    if (shieldTypeObj[key as keyof ShieldTypesObjType] == id) {
      return key as keyof ShieldTypesObjType;
    }
  }
  return "";
};

export { sendChannelTypeObj, receiverIdTypeObj, messageTypeObj, shieldTypeObj };
