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
    handleTargetFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    setTargetUser: (state, action) => {
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
    setTargetUserError: (state, action) => {
      const payload = action.payload;

      return { ...state, loading: false, error: payload.error };
    },
    resetTargetUser: () => getInitialState(),
  },
});

export const { setTargetUser, resetTargetUser, setTargetUserError, handleTargetFieldChange } =
  targetUserSlice.actions;
export default targetUserSlice.reducer;
