import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;
export const dataRefreshSlice = createSlice({
  name: "dataRefresh",
  initialState,
  reducers: {
    refresh(state) {
      let newstate = state + 1;
      if (newstate > 1000) {
        newstate = 0;
      }
      return newstate;
    },
  },
});
export const { refresh: refreshData } = dataRefreshSlice.actions;
