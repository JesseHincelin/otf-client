import { createSlice } from "@reduxjs/toolkit";

const TARGET_ACCOUNT_STATE = {
  error: null,
  loading: false,
  userNameValue: "",
  domainValue: "",
};

const getInitialState = () => TARGET_ACCOUNT_STATE;

const targetAccountSlice = createSlice({
  name: "targetAccount",
  initialState: getInitialState(),
  reducers: {
    handleFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    resetTargetAccount: () => getInitialState(),
    setTargetAccountError: (state, action) => {
      const payload = action.payload;

      return { ...state, loading: false, error: payload.error };
    },
    startLoading: (state) => {
      return { ...state, loading: true };
    },
  },
});

export const { handleFieldChange, resetTargetAccount, setTargetAccountError, startLoading } =
  targetAccountSlice.actions;
export default targetAccountSlice.reducer;
