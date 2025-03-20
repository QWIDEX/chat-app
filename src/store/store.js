import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import chatsSlice from "./slices/chatsSlice";
import usersSlice from "./slices/usersSlice";
import createWebSocketMiddleware from "./websocketMiddleware";

export const store = configureStore({
  reducer: combineReducers({
    userSlice, 
    chatsSlice,
    usersSlice,
  }),
  middleware: () => [createWebSocketMiddleware("ws://localhost:8080/ws")]
});
