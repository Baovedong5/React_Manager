import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";

//redux store
export const store = configureStore({
  reducer: {
    count: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
