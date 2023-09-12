import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
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

const userSlice = createSlice({
  name: "user",
  initialState: USER_STATE,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload.user;

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
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
