import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import chatsSlice from "./slices/chatsSlice";
import usersSlice from "./slices/usersSlice";

export const store = configureStore({
  reducer: combineReducers({
    userSlice, 
    chatsSlice,
    usersSlice,
  }),
});
