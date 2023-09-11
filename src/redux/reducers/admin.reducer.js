import { createSlice } from "@reduxjs/toolkit";

const ADMIN_STATE = {};

const adminSlice = createSlice({
  name: "admin",
  initialState: ADMIN_STATE,
  reducers: {},
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
