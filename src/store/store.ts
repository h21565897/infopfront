import { accountListlSlice } from "@/store/accountDataSlice";
import { messageTemplateListSlice } from "@/store/messageTemplateDataSlice";
import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import { dataRefreshSlice } from "./dataRefreshSlice";

const store = configureStore({
  reducer: {
    accountList: accountListlSlice.reducer,
    messageTemplateList: messageTemplateListSlice.reducer,
    dataRefresh: dataRefreshSlice.reducer,
  },
});
export default store;
