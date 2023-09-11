import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {};

const userSlice = createSlice({
  name: "user",
  initialState: USER_STATE,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
