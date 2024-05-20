import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@store/features/AuthSlice";
import UserSlice from "@store/features/UserSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
  },
});
