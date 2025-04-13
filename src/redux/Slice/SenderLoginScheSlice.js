import { createSlice } from "@reduxjs/toolkit";

const senderSlice = createSlice({
  name: "sender",
  initialState: {
    bool: false,
    chat: true,
  },
  reducers: {
    LoginSender(state, action) {
      state.bool = action.payload;
    },
    LoginSender(state, action) {
      state.bool = action.payload;
    },
    showChat(state, action) {
      state.chat = action.payload;
    },
  },
});

export const { LoginSender, showChat } = senderSlice.actions;
export const senderRoucer = senderSlice.reducer;
