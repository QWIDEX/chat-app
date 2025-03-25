import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Chats: undefined,
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
    addChatMember: (state, action) => {
      const chatIdx = state.Chats.findIndex(
        (chat) => chat.chatId === action.payload.chatId
      );

      const updatedChat = state.Chats[chatIdx];
      updatedChat.members?.unshift(action.payload.member);

      state.Chats = [
        updatedChat,
        ...state.Chats.slice(0, chatIdx),
        ...state.Chats.slice(chatIdx + 1),
      ];
    },
  },
});

export const { setChats, addChat, receiveMessage, sendMessage, loadMessages, addChatMember } =
  chatsSlice.actions;
export default chatsSlice.reducer;
