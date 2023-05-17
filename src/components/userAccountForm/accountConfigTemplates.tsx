"use client";
import React from "react";
import { IUserChannelType } from "../../common/types/userAccountType";
import { useFormik } from "formik";
import { FormControl, TextField } from "@mui/material";
import * as yup from "yup";
import { useMuiFormik } from "../../common/utils/registerMuiFormikAttris";
function AccountConfigTemplates({
  accountType,
  formik,
}: {
  accountType: keyof IUserChannelType | "";
  formik: any;
}) {
  const { textFieldFormikField: TextFieldFormikField } = useMuiFormik(formik);
  switch (accountType) {
    case "email":
      return (
        <FormControl>
          <TextField {...TextFieldFormikField("host", "text")}></TextField>
          <TextField {...TextFieldFormikField("port", "text")}></TextField>
          <TextField {...TextFieldFormikField("user", "text")}></TextField>
          <TextField {...TextFieldFormikField("pass", "text")}></TextField>
          <TextField {...TextFieldFormikField("from", "text")}></TextField>
        </FormControl>
      );
    case "message":
      return <div>message</div>;
    default:
      return <div>default</div>;
  }
}
export default AccountConfigTemplates;
