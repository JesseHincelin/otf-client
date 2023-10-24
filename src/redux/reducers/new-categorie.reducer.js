import { createSlice } from "@reduxjs/toolkit";

const NEW_CATEGORIE_STATE = {
  error: "",
  loading: false,
  titleValue: "",
  color: "",
};

const getInitialState = () => NEW_CATEGORIE_STATE;

const newCategorieSlice = createSlice({
  name: "newCategorie",
  initialState: getInitialState(),
  reducers: {
    handleFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    startLoading: (state) => {
      return { ...state, loading: true };
    },
    stopLoading: (state) => {
      return { ...state, loading: false };
    },
    resetNewCategorie: () => getInitialState(),
    setNewCategorieError: (state, action) => {
      const { error } = action.payload;

      return { ...state, error: error };
    },
  },
});

export const {
  handleFieldChange,
  startLoading,
  stopLoading,
  resetNewCategorie,
  setNewCategorieError,
} = newCategorieSlice.actions;
export default newCategorieSlice.reducer;
