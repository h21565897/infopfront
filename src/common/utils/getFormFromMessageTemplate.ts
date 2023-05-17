import { useUserDataReducers } from "@/hooks/useUserAccountAndTemplateData/hooks";

import {
  getReceiverIdNameById,
  getShieldTypeNameById,
  getMessageTypeNameById,
  getSendChannelNameById,
} from "../types/messageTemplateFormTypes";
import { IUserAccount } from "../types/userAccountType";

import { IMessageTemplate } from "@/common/types/messageTemplateTypes";
import {
  FormValueType,
  IEmail,
} from "@/components/messageTemplateForm/messsageTemplateFormConstants";

export const buildFormValueFromMessageTemplateAndAccount = (
  messageTemplateData: IMessageTemplate,
  account: IUserAccount | undefined
) => {
  console.log("messageTemplateData", messageTemplateData);
  const basicFormData: FormValueType = {} as FormValueType;
  if (messageTemplateData) {
    basicFormData.name = messageTemplateData.name;
    basicFormData.prosper = messageTemplateData.proposer;
    basicFormData["receiver-id-type"] = getReceiverIdNameById(
      messageTemplateData.idType
    );
    basicFormData["mute-type"] = getShieldTypeNameById(
      messageTemplateData.shieldType
    );
    basicFormData["message-type"] = getMessageTypeNameById(
      messageTemplateData.msgType
    );
    basicFormData["channel-info"] = getSendChannelNameById(
      messageTemplateData.sendChannel
    );
  }
  console.log("basicFormData", basicFormData);
  console.log(
    "sendchaneeeee",
    getSendChannelNameById(messageTemplateData.sendChannel)
  );
  switch (getSendChannelNameById(messageTemplateData.sendChannel)) {
    case "email":
      const msgContent: {
        content: string;
        title: string;
      } = JSON.parse(messageTemplateData.msgContent);
      const emailFormData: IEmail = {
        "channel-account": account?.id || 0,
        "email-title": msgContent.title,
        "email-content": msgContent.content,
      };
      return { ...basicFormData, ...emailFormData };
      break;
    case "message":
      break;
  }
  return basicFormData;
};
