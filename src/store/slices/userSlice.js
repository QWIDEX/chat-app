import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
