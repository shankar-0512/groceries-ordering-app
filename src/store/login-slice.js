import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    userId: null,
    userName: null,
    userAddress: null,
  },
  reducers: {
    LoginStateHandler(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },
    UpdateUserId(state, action) {
      state.userId = action.payload;
    },
    UpdateUserName(state, action) {
      state.userName = action.payload;
    },
    UpdateUserAddress(state, action) {
      state.userAddress = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
