import { createSlice } from "@reduxjs/toolkit";

const NEW_PASSWORD_STATE = {
  error: null,
  loading: false,
  oldPassValue: "",
  newPassValue: "",
  confPassValue: "",
};

const getInitialState = () => NEW_PASSWORD_STATE;

const newPasswordSlice = createSlice({
  name: "newPassword",
  initialState: getInitialState(),
  reducers: {
    handleFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    resetNewPassword: () => getInitialState(),
    setNewPasswordError: (state, action) => {
      const payload = action.payload;

      return { ...state, loading: false, error: payload.error };
    },
    startLoading: (state) => {
      return { ...state, loading: true };
    },
  },
});

export const { handleFieldChange, resetNewPassword, setNewPasswordError, startLoading } =
  newPasswordSlice.actions;
export default newPasswordSlice.reducer;
