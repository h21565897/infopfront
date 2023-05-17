"use client";
import { useMemo, useRef, useState } from "react";
import {
  SendChannelTypesObjType,
  sendChannelTypeObj,
} from "../../common/types/messageTemplateFormTypes";
import useSWR from "swr";
import { Autocomplete, Box, FormControl, TextField } from "@mui/material";

import { useUserDataReducers } from "@/hooks/useUserAccountAndTemplateData/hooks";
import { useMuiFormik } from "../../common/utils/registerMuiFormikAttris";

export default function ChannelInfo({
  channelType,
  formik,
  disabled,
}: {
  channelType: keyof SendChannelTypesObjType | "";
  formik: any;
  disabled?: boolean;
}) {
  type dataType = {
    name: string;
    id: number;
  };
  const { accountList } = useUserDataReducers();
  const [emailAccounts, setEmailAccounts] = useState<dataType[]>([]);
  useMemo(() => {
    if (accountList) {
      if (channelType) {
        const filteredEmailAccounts = accountList?.filter(
          (item: any) => item.sendChannel == sendChannelTypeObj[channelType]
        );

        setEmailAccounts(filteredEmailAccounts);
      }
    }
  }, [accountList, channelType]);
  const { textFieldFormikField: TextFieldFormikField } = useMuiFormik(formik);
  switch (channelType) {
    case "message":
      return <div>message</div>;
    case "email":
      return (
        <FormControl>
          <Autocomplete
            disabled={disabled}
            fullWidth
            defaultValue={{
              name:
                accountList.find(
                  (value) => value.id == formik.values["channel-account"]
                )?.name || "default",
              id: formik.values["channel-account"] || 0,
            }}
            options={emailAccounts}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              formik.setFieldValue("channel-account", newValue?.id);
            }}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                error={Boolean(formik.errors?.["channel-account"])}
                helperText={formik.errors?.["channel-account"]}
                {...params}
                label="Accounts"
              />
            )}
          ></Autocomplete>
          <TextField
            disabled={disabled}
            {...TextFieldFormikField("email-title", "text")}
          ></TextField>
          <TextField
            disabled={disabled}
            {...TextFieldFormikField("email-content", "text")}
          ></TextField>
        </FormControl>
      );
    case "push":
      return <div>push</div>;
    case "wechat":
      return <div>wechat</div>;
    default:
      return <div>default</div>;
  }
}
