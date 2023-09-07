import { createSlice } from "@reduxjs/toolkit";
import { ROUTES } from "../../utils/routes.util";

const ROUTER_STATE = {
  currentRoute: ROUTES.signUp,
};

const routerSlice = createSlice({
  name: "router",
  initialState: ROUTER_STATE,
  reducers: {
    redirect: (state, action) => {
      const { route } = action.payload;
      return { ...state, currentRoute: route };
    },
  },
});

export const { redirect } = routerSlice.actions;
export default routerSlice.reducer;
