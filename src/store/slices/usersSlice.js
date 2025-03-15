import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
        state.Users = action.payload
    },
  },
});

export default usersSlice.reducer;
