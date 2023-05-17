"use client";
import React from "react";
import Radio from "@mui/material/Radio";

export const useMuiFormik = (formik: any) => {
  const textFieldFormikField = (name: string, type: string) => {
    return {
      id: name,
      name: name,
      label: name,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      type: type,
      value: formik.values[name],
      error: formik.touched[name] && Boolean(formik.errors[name]),
      helperText: formik.touched[name] && formik.errors[name],
    };
  };
  const radioField = (name: string) => {
    return {
      value: name,
      label: name,
      control: <Radio />,
      onBlur: formik.handleBlur,
      error: formik.touched[name] && Boolean(formik.errors[name]),
    };
  };
  const radioGroupField = (name: string) => {
    return {
      name: name,
      value: formik.values[name],
      row: true,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    };
  };
  return {
    textFieldFormikField: textFieldFormikField,
    radioField: radioField,
    radioGroupField: radioGroupField,
  };
};
