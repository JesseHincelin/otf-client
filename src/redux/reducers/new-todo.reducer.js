import { createSlice } from "@reduxjs/toolkit";

const NEW_TODO_STATE = {
  error: null,
  loading: false,
  titleValue: "",
  createdOn: "",
  createdBy: "",
  dueOnValue: "",
  priority: "",
  groupeTask: "",
  categorie: "",
  detailsValue: "",
  assignedTo: [],
};

const getInitialState = () => NEW_TODO_STATE;

const newTodoSlice = createSlice({
  name: "newTodo",
  initialState: getInitialState(),
  reducers: {
    handleFieldChange: (state, action) => {
      const { value, props } = action.payload;

      return { ...state, [props]: value };
    },
    setAssignedTo: (state, action) => {
      const { assignedTo } = action.payload;
      return { ...state, assignedTo: assignedTo };
    },
    startLoading: (state) => {
      return { ...state, loading: true };
    },
    stopLoading: (state) => {
      return { ...state, loading: false };
    },

    resetNewTodo: () => getInitialState(),
    setNewTodoError: (state, action) => {
      const { error } = action.payload;

      return { ...state, error: error };
    },
  },
});

export const {
  handleFieldChange,
  setAssignedTo,
  startLoading,
  stopLoading,
  resetNewTodo,
  setNewTodoError,
} = newTodoSlice.actions;
export default newTodoSlice.reducer;
