import { createSlice } from "@reduxjs/toolkit";

const CREATE_ACCOUNT_STATE = {
  error: null,
  loading: false,
  userNameValue: "",
  passwordValue: "",
  domainValue: "Select the domain :",
  groupeValue: "Select a groupe :",
  role: "Select a role :",
};

const getInitialState = () => CREATE_ACCOUNT_STATE;

const createAccountSlice = createSlice({
  name: "createAccount",
  initialState: getInitialState(),
  reducers: {
    handleFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    resetCreateAccount: () => getInitialState(),
    setCreateAccountError: (state, action) => {
      const payload = action.payload;

      return { ...state, loading: false, error: payload.error };
    },
    startLoading: (state) => {
      return { ...state, loading: true };
    },
  },
});

export const { handleFieldChange, resetCreateAccount, setCreateAccountError, startLoading } =
  createAccountSlice.actions;
export default createAccountSlice.reducer;
