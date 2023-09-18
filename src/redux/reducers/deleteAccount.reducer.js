import { createSlice } from "@reduxjs/toolkit";

const DELETE_ACCOUNT_STATE = {
  error: null,
  loading: false,
  userNameValue: "",
  domainValue: "",
};

const getInitialState = () => DELETE_ACCOUNT_STATE;

const deleteAccountSlice = createSlice({
  name: "deleteAccount",
  initialState: getInitialState(),
  reducers: {
    handleFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    resetDeleteAccount: () => getInitialState(),
    setDeleteAccountError: (state, action) => {
      const payload = action.payload;

      return { ...state, loading: false, error: payload.error };
    },
    startLoading: (state) => {
      return { ...state, loading: true };
    },
  },
});

export const { handleFieldChange, resetDeleteAccount, setDeleteAccountError, startLoading } =
  deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;
