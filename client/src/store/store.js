import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@store/features/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});
