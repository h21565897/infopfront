import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IUserAccount,
  IUserAccountForm,
} from "../common/types/userAccountType";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";

const initialState: IUserAccount[] = [];
export const accountListlSlice = createSlice({
  name: "accountData",
  initialState: {
    accountData: initialState,
  },
  reducers: {
    replace(state, action: PayloadAction<IUserAccount[]>) {
      state.accountData = action.payload;
    },
  },
});

export const { replace: replaceAccountList } = accountListlSlice.actions;
