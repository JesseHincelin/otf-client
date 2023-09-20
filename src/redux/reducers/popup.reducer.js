import { createSlice } from "@reduxjs/toolkit";

const POPUP_STATE = {
  activePopup: false,
  message: "",
};

const getInitialState = () => POPUP_STATE;

const popupSlice = createSlice({
  name: "popup",
  initialState: getInitialState(),
  reducers: {
    setMessage: (state, action) => {
      const message = action.payload.message;

      return { ...state, message: message, activePopup: true };
    },
    popupOn: (state) => {
      return { ...state, activePopup: true };
    },
    popupOff: (state) => {
      return { ...state, activePopup: false };
    },
    resetPopup: () => getInitialState(),
  },
});

export const { setMessage, popupOn, popupOff, resetPopup } = popupSlice.actions;
export default popupSlice.reducer;
