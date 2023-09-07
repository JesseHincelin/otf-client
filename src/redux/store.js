import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./reducers/router.reducer";

const store = configureStore({
  reducer: {
    routerState: routerReducer,
  },
});

export default store;
