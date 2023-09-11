import { createSlice } from "@reduxjs/toolkit";

const LOGIN_STATE = {
  error: null,
  loading: false,
  domainValue: "",
  userNameValue: "",
  passwordValue: "",
};

const getInitialState = () => LOGIN_STATE;

const loginSlice = createSlice({
  name: "login",
  initialState: getInitialState(),
  reducers: {
    handleFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    resetLogin: () => getInitialState(),
    setLoginError: (state, action) => {
      const payload = action.payload;

      return { ...state, loading: false, error: payload.error };
    },
    startLoading: (state) => {
      return { ...state, loading: true };
    },
  },
});

export const { handleFieldChange, resetLogin, setLoginError, startLoading } = loginSlice.actions;
export default loginSlice.reducer;
