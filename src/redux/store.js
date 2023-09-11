import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./reducers/router.reducer";
import userReducer from "./reducers/user.reducer";
import adminReducer from "./reducers/admin.reducer";
import loginReducer from "./reducers/login.reducer";

const store = configureStore({
  reducer: {
    routerState: routerReducer,
    userState: userReducer,
    adminState: adminReducer,
    loginState: loginReducer,
  },
});

export default store;
