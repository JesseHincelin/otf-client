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
  detailsVlaue: "",
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
  },
});

export const { handleFieldChange } = newTodoSlice.actions;
export default newTodoSlice.reducer;
