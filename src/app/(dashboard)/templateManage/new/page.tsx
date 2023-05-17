"use client";
import React from "react";
import MessageTemplateForm from "../../../../components/messageTemplateForm/messageTemplateForm";

function Page() {
  return (
    <div>
      <MessageTemplateForm isReadOnly={false}></MessageTemplateForm>
    </div>
  );
}

export default Page;
