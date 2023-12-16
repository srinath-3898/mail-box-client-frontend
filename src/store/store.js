import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import mailReducer from "./mail/mailSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    mail: mailReducer,
  },
});
