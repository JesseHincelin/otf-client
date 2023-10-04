import { createSlice } from "@reduxjs/toolkit";

const GROUPE_STATE = {
  groupes: [],
  titleValue: "",
  groupeId: "",
  newTitleValue: "",
  error: null,
  loading: false,
};

const getInitialState = () => GROUPE_STATE;

const groupeSlice = createSlice({
  name: "groupe",
  initialState: getInitialState(),
  reducers: {
    handleFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    setGroupes: (state, action) => {
      const { groupes } = action.payload;

      return { ...state, groupes: groupes, loading: false };
    },
    setGroupeError: (state, action) => {
      const { error } = action.payload;

      return { ...state, error: error, loading: false };
    },
    startLoading: (state) => {
      return { ...state, loading: true };
    },
    resetGroupeValue: (state) => {
      return { ...state, titleValue: "", newTitleValue: "", loading: false, error: null };
    },
  },
});

export const { handleFieldChange, setGroupes, setGroupeError, startLoading, resetGroupeValue } =
  groupeSlice.actions;
export default groupeSlice.reducer;
