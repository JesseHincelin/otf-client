import { createSlice } from "@reduxjs/toolkit";

const TARGET_USER_STATE = {
  id: "",
  userName: "",
  role: "",
  firstConnection: true,
  domain: "",
  groupe: "",
  theme: "",
  todosAssigned: [],
  error: null,
};

const getInitialState = () => TARGET_USER_STATE;

const targetUserSlice = createSlice({
  name: "targetUser",
  initialState: getInitialState(),
  reducers: {
    setTargetUser: (state, action) => {
      const user = action.payload.user;

      console.log(action.payload.user);

      return {
        ...state,
        error: null,
        id: user.id,
        userName: user.userName,
        role: user.role,
        firstConnection: user.firstConnection,
        domain: user.domain,
        groupe: user.groupe,
        theme: user.theme,
        todosAssigned: user.todosAssigned,
      };
    },
    resetTargetUser: () => getInitialState(),
  },
});

export const { setTargetUser, resetTargetUser } = targetUserSlice.actions;
export default targetUserSlice.reducer;
