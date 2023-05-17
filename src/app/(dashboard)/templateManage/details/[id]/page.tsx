"use client";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useUserDataReducers } from "@/hooks/useUserAccountAndTemplateData/hooks";
import { buildFormValueFromMessageTemplateAndAccount } from "../../../../../common/utils/getFormFromMessageTemplate";
import { AllFormValueTypes } from "@/components/messageTemplateForm/messsageTemplateFormConstants";
import MessageTemplateForm from "@/components/messageTemplateForm/messageTemplateForm";

function Page({ params }: { params: { id: number } }) {
  const { messageTemplateList, accountList, getAccountById } =
    useUserDataReducers();
  const [formValues, setFormValues] = useState<AllFormValueTypes>(
    {} as AllFormValueTypes
  );
  useEffect(() => {
    const messageTemplate = messageTemplateList[params.id];
    if (messageTemplate) {
      setFormValues(
        buildFormValueFromMessageTemplateAndAccount(
          messageTemplate,
          getAccountById(messageTemplate.sendAccount)
        )
      );
    }
  }, [messageTemplateList, params.id]);

  return (
    <div>
      <MessageTemplateForm
        isReadOnly={true}
        defaultinitialValues={formValues}
      ></MessageTemplateForm>
    </div>
  );
}

export default Page;
