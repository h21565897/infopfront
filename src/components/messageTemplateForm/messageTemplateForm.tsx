"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import * as yup from "yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  useFormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Formik, FormikConfig, useFormik } from "formik";
import ChannelInfo from "./channelInfo";
import MRadioGroup from "./radioGroup";
import { useMuiFormik } from "../../common/utils/registerMuiFormikAttris";
import {
  MessageTypesObjType,
  ReceiverTypesObjType,
  SendChannelTypesObjType,
  ShieldTypesObjType,
  messageTypeObj,
  receiverIdTypeObj,
  receiverIdTypes,
  sendChannelTypeObj,
  shieldTypeObj,
} from "../../common/types/messageTemplateFormTypes";
import { getSession, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserDataReducers } from "@/hooks/useUserAccountAndTemplateData/hooks";
import { IMessageTemplate } from "@/common/types/messageTemplateTypes";
import {
  AllFormValueTypes,
  flattenedFormValueType,
  receiverIdTypeRadios,
  messageTypeRadios,
  muteTypeRadios,
  sendChannelTypeRadios,
  createValidateSchema,
} from "./messsageTemplateFormConstants";
import { refreshData } from "@/store/dataRefreshSlice";

function MessageTemplateForm({
  isReadOnly,
  editingId = 0,
  defaultinitialValues,
}: {
  isReadOnly: boolean;
  editingId?: number;
  defaultinitialValues?: AllFormValueTypes;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    refetchMessageTemplateList,
    saveOrUpdateMessageTemplate,
    doRefreshData,
  } = useUserDataReducers();
  const formikInitialValues: flattenedFormValueType = {
    name: "",
    prosper: "",
    [receiverIdTypeRadios.groupName]: "",
    [messageTypeRadios.groupName]: "",
    [muteTypeRadios.groupName]: "",
    [sendChannelTypeRadios.groupName]: "",
    //email
    "channel-account": 0,
    "email-title": "",
    "email-content": "",
    //message
    "message-content": "",
    "message-title": "",
    ...defaultinitialValues,
  };
  const formik = useFormik<flattenedFormValueType>({
    enableReinitialize: true,
    initialValues: formikInitialValues,
    validate: async (values) => {
      const schema = createValidateSchema(
        values[sendChannelTypeRadios.groupName] as keyof SendChannelTypesObjType
      );
      try {
        await schema.validate(values, { abortEarly: false });
      } catch (error: yup.ValidationError | any) {
        return error.inner.reduce((acc: any, curr: any) => {
          return {
            ...acc,
            [curr.path]: curr.message,
          };
        }, {});
      }
    },

    onSubmit: async (values) => {
      console.log("submitting");
      let msgContent = "";
      switch (formik.values[sendChannelTypeRadios.groupName]) {
        case "email":
          msgContent = JSON.stringify({
            content: values["email-content"],
            title: values["email-title"],
          });
          break;
        default:
      }
      const messageTemplate: IMessageTemplate = {
        name: values.name,
        idType:
          receiverIdTypeObj[
            values[receiverIdTypeRadios.groupName] as keyof ReceiverTypesObjType
          ],
        msgType:
          messageTypeObj[
            values[messageTypeRadios.groupName] as keyof MessageTypesObjType
          ],
        creator: session?.user_creator,
        templateType: 20,
        expect_push_time: "",
        proposer: values.prosper,
        sendChannel:
          sendChannelTypeObj[
            values[
              sendChannelTypeRadios.groupName
            ] as keyof SendChannelTypesObjType
          ],
        sendAccount: values["channel-account"],
        cronCrowdPath: "",
        shieldType:
          shieldTypeObj[
            values[muteTypeRadios.groupName] as keyof ShieldTypesObjType
          ],
        msgContent: msgContent,
      };
      if (editingId !== 0) {
        messageTemplate.id = editingId;
      }
      try {
        setBackdropOpen(true);
        await saveOrUpdateMessageTemplate(messageTemplate);
        toast.success("success");
        doRefreshData();
        router.replace("/templateManage");
      } catch (error: any) {
        toast.error("error" + error.message);
        console.log(error.message);
      } finally {
        setBackdropOpen(false);
      }
    },
  });

  const fieldUtils = useMuiFormik(formik);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const { textFieldFormikField, radioField, radioGroupField } =
    useMuiFormik(formik);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Toaster></Toaster>
      <Backdrop
        open={backdropOpen}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <FormControl>
        <TextField
          disabled={isReadOnly}
          {...textFieldFormikField("name", "text")}
        ></TextField>
        <TextField
          disabled={isReadOnly}
          {...textFieldFormikField("prosper", "text")}
        ></TextField>
        <MRadioGroup
          disabled={isReadOnly}
          formik={formik}
          radioNames={receiverIdTypeRadios.radioNames}
          groupName={receiverIdTypeRadios.groupName}
          labelName={receiverIdTypeRadios.labelName}
          fiedUtils={fieldUtils}
        ></MRadioGroup>
        <MRadioGroup
          disabled={isReadOnly}
          formik={formik}
          radioNames={messageTypeRadios.radioNames}
          groupName={messageTypeRadios.groupName}
          labelName={messageTypeRadios.labelName}
          fiedUtils={fieldUtils}
        ></MRadioGroup>
        <MRadioGroup
          disabled={isReadOnly}
          formik={formik}
          radioNames={muteTypeRadios.radioNames}
          groupName={muteTypeRadios.groupName}
          labelName={muteTypeRadios.labelName}
          fiedUtils={fieldUtils}
        ></MRadioGroup>
        <MRadioGroup
          disabled={isReadOnly}
          formik={formik}
          radioNames={sendChannelTypeRadios.radioNames}
          groupName={sendChannelTypeRadios.groupName}
          labelName={sendChannelTypeRadios.labelName}
          fiedUtils={fieldUtils}
          onChange={(e) => {
            console.log("fsfe");
            console.log(formik.values[sendChannelTypeRadios.groupName]);
          }}
        ></MRadioGroup>
        <ChannelInfo
          disabled={isReadOnly}
          channelType={formik.values[sendChannelTypeRadios.groupName]}
          formik={formik}
        ></ChannelInfo>
        {!isReadOnly && (
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        )}
      </FormControl>
    </form>
  );
}

export default MessageTemplateForm;
