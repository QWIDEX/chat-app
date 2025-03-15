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
  },
});

export default chatsSlice.reducer;
