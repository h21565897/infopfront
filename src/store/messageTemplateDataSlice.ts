import { IMessageTemplate } from "@/common/types/messageTemplateTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IMessageTemplate[] = [];

export const messageTemplateListSlice = createSlice({
  name: "messageTemplateLists",
  initialState: {
    messageTemplateLists: initialState,
  },
  reducers: {
    replace(state, action: PayloadAction<IMessageTemplate[]>) {
      state.messageTemplateLists = action.payload;
    },
  },
});

export const { replace: replaceMessageTemplateList } =
  messageTemplateListSlice.actions;
