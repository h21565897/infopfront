"use client";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  duration,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";

import * as yup from "yup";
import AccountConfigTemplates from "../../../../components/userAccountForm/accountConfigTemplates";
import {
  IEmailAccountConfig,
  IUserAccountForm,
} from "../../../../common/types/userAccountType";
import { IUserChannelType } from "../../../../common/types/userAccountType";
import { accountSaveParamsType } from "@/pages/api/channels/save";
import { useSession } from "next-auth/react";
import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { sendChannelTypeObj } from "../../../../common/types/messageTemplateFormTypes";
import { useUserDataReducers } from "@/hooks/useUserAccountAndTemplateData/hooks";
import MRadioGroup from "../../../../components/messageTemplateForm/radioGroup";
import { useMuiFormik } from "../../../../common/utils/registerMuiFormikAttris";
function NewAccount() {
  const { data: session } = useSession();
  const router = useRouter();
  const validateScheme = yup.object({
    "account-name": yup.string().required(),
    "pushing-channel": yup.string().required("Required"),
    host: yup.string().url("Please enter a valid host").required("Required"),
    port: yup.number().required("Required"),
    user: yup.string().email().required("Required"),
    pass: yup.string().required("Required"),
    from: yup.string().email("Please enter a valid email").required("Required"),
  });
  const { saveOrUpdateUserAccount, doRefreshData } = useUserDataReducers();
  const formik = useFormik<IUserAccountForm>({
    initialValues: {
      "account-name": "",
      "pushing-channel": "",
      host: "",
      port: "",
      user: "",
      pass: "",
      from: "",
    },
    validationSchema: validateScheme,
    onSubmit: async (values) => {
      console.log(values);
      switch (values["pushing-channel"]) {
        case "email":
          const requestBody: accountSaveParamsType = {
            name: values["account-name"],
            sendChannel: 40,
            accountConfig: JSON.stringify({
              host: values.host,
              port: values.port,
              user: values.user,
              pass: values.pass,
              from: values.from,
              starttlsEnable: true,
              auth: true,
              sslEnable: true,
            }),
            creator: session?.user_creator || "",
          };
          try {
            setBackdropOpen(true);
            await saveOrUpdateUserAccount(requestBody);
            doRefreshData();
            toast.success("Success");
            router.replace("/");
          } catch (error: any) {
            toast.error(error.message);
          } finally {
            setBackdropOpen(false);
          }

          break;
        case "message":
          console.log(values);
          break;
      }
    },
  });
  const { textFieldFormikField: TextFieldFormikField } = useMuiFormik(formik);
  const radioNames = { email: "email", message: "message" };
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Toaster />
      <Backdrop
        open={backdropOpen}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <FormControl>
        <TextField
          {...TextFieldFormikField("account-name", "text")}
        ></TextField>
        <MRadioGroup
          groupName="pushing-channel"
          formik={formik}
          radioNames={sendChannelTypeObj}
          labelName="Pushing Channel"
          fiedUtils={useMuiFormik(formik)}
        ></MRadioGroup>
        <AccountConfigTemplates
          formik={formik}
          accountType={formik.values["pushing-channel"]}
        ></AccountConfigTemplates>
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
}

export default NewAccount;
