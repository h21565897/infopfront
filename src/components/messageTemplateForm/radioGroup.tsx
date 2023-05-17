import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
interface Info {
  [key: string]: string;
}
interface MyType {
  [key: string]: (...arg: any[]) => any;
}
function MRadioGroup({
  groupName,
  formik,
  radioNames,
  labelName,
  fiedUtils,
  onChange,
  disabled,
}: {
  groupName: string;
  formik: any;
  radioNames: Info;
  labelName: string;
  fiedUtils: MyType;
  onChange?: (...arg: any[]) => any;
  disabled?: boolean;
}) {
  const { radioGroupField, radioField } = fiedUtils;
  return (
    <FormControl
      error={formik.touched[groupName] && Boolean(formik.errors[groupName])}
      disabled={disabled}
    >
      <FormLabel id={groupName}>{labelName}</FormLabel>
      <RadioGroup {...radioGroupField(groupName)} aria-labelledby={groupName}>
        {Object.keys(radioNames).map((key) => {
          return (
            <FormControlLabel
              key={key}
              {...radioField(key as keyof Info)}
            ></FormControlLabel>
          );
        })}
      </RadioGroup>
      <FormHelperText>
        {formik.touched[groupName] && formik.errors[groupName]}
      </FormHelperText>
    </FormControl>
  );
}

export default MRadioGroup;
