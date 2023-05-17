"use client";

import { useUserDataReducers } from "@/hooks/useUserAccountAndTemplateData/hooks";
import React, { useEffect, useState } from "react";
import { buildFormValueFromMessageTemplateAndAccount } from "../../../../../common/utils/getFormFromMessageTemplate";
import MessageTemplateForm from "@/components/messageTemplateForm/messageTemplateForm";
import { AllFormValueTypes } from "@/components/messageTemplateForm/messsageTemplateFormConstants";

function MessageTempalteEdit({ params }: { params: { id: number } }) {
  const { messageTemplateList, accountList, getAccountById } =
    useUserDataReducers();
  const [formValues, setFormValues] = useState<AllFormValueTypes>(
    {} as AllFormValueTypes
  );
  const [editingId, setEditingId] = useState<number>(0);
  useEffect(() => {
    const messageTemplate = messageTemplateList[params.id];
    if (messageTemplate) {
      setFormValues(
        buildFormValueFromMessageTemplateAndAccount(
          messageTemplate,
          getAccountById(messageTemplate.sendAccount)
        )
      );
      setEditingId(messageTemplate.id || 0);
    }
  }, [messageTemplateList, params.id]);
  return (
    <div>
      <MessageTemplateForm
        editingId={editingId}
        isReadOnly={false}
        defaultinitialValues={formValues}
      ></MessageTemplateForm>
    </div>
  );
}

export default MessageTempalteEdit;
