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
      const chatIdx = state.Chats.findIndex(
        (chat) => chat.chatId === action.payload.dest
      );

      const updatedChat = state.Chats[chatIdx];
      updatedChat.chat?.unshift(action.payload);

      state.Chats = [
        updatedChat,
        ...state.Chats.slice(0, chatIdx),
        ...state.Chats.slice(chatIdx + 1),
      ];
    },
    receiveMessage: (state, action) => {
      const chatIdx = state.Chats.findIndex(
        (chat) => chat.chatId === action.payload.dest
      );

      const updatedChat = state.Chats[chatIdx];
      updatedChat.chat?.unshift(action.payload);

      state.Chats = [
        updatedChat,
        ...state.Chats.slice(0, chatIdx),
        ...state.Chats.slice(chatIdx + 1),
      ];
    },
    loadMessages: (state, action) => {
      state.Chats[action.payload.chatIdx].chat.push(...action.payload.messages);
    },
  },
});

export const { setChats, addChats, receiveMessage, sendMessage, loadMessages } =
  chatsSlice.actions;
export default chatsSlice.reducer;
