import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./reducers/router.reducer";
import userReducer from "./reducers/user.reducer";
// import adminReducer from "./reducers/admin.reducer";
import loginReducer from "./reducers/login.reducer";
import newPasswordReducer from "./reducers/new-password.reducer";
import createAccountReducer from "./reducers/createAccount.reducer";
import targetUserReducer from "./reducers/targetUser.reducer";
import targetAccountReducer from "./reducers/targetAccount.reducer";
import popupReducer from "./reducers/popup.reducer";
import groupeReducer from "./reducers/groupe.reducer";
import newTodoReducer from "./reducers/new-todo.reducer";

const store = configureStore({
  reducer: {
    routerState: routerReducer,
    userState: userReducer,
    targetUserState: targetUserReducer,
    // adminState: adminReducer,
    loginState: loginReducer,
    newPasswordState: newPasswordReducer,
    createAccountState: createAccountReducer,
    targetAccountState: targetAccountReducer,
    popupState: popupReducer,
    groupeState: groupeReducer,
    newTodoState: newTodoReducer,
  },
});

export default store;
