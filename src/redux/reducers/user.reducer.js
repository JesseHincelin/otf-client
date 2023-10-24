import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
  id: "",
  userName: "",
  role: "",
  firstConnection: true,
  domain: "",
  groupe: "",
  theme: "",
  todosAssigned: [],
  error: null,
  categories: [],
  groupeMembers: [],
};

const getInitialState = () => USER_STATE;

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action) => {
      const user = action.payload.user;

      return {
        ...state,
        error: null,
        id: user.id,
        userName: user.userName,
        role: user.role,
        firstConnection: user.firstConnection,
        domain: user.domain,
        groupe: user.groupe,
        theme: user.theme,
        todosAssigned: user.todosAssigned,
      };
    },
    resetUser: () => getInitialState(),
    setCategories: (state, action) => {
      const categories = action.payload.categories;

      return { ...state, categories: categories };
    },
    setGroup: (state, action) => {
      const groupeMembers = action.payload.groupeMembers;

      return { ...state, groupeMembers: groupeMembers };
    },
  },
});

export const { setUser, resetUser, setCategories, setGroup } = userSlice.actions;
export default userSlice.reducer;
