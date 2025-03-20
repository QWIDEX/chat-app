import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.Chats = action.payload;
    },
    addChat: (state, action) => {
      state.Chats.unshift(action.payload);
    },
    sendMessage: (state, action) => {
      const chatIdx = state.Chats.findIndex((chat) => chat.chatId === action.payload.dest)

      state.Chats[chatIdx].chat?.unshift(action.payload)
    },
    receiveMessage: (state, action) => {
      const chatIdx = state.Chats.findIndex((chat) => chat.chatId === action.payload.dest)

      state.Chats[chatIdx]?.unshift(action.payload.message)
    },
  },
});

export const { setChats, addChats, receiveMessage, sendMessage } = chatsSlice.actions;
export default chatsSlice.reducer;
