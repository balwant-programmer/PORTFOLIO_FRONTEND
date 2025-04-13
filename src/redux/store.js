import { configureStore } from "@reduxjs/toolkit";
import authslice from "./Slice/authSlice.js";
import { aboutReducer } from "./Slice/throuaboutHihdeSlice.js";
import { senderRoucer } from "./Slice/SenderLoginScheSlice.js";
import { userLogoReducer } from "./Slice/userLogoSlice.js";
export const store = configureStore({
  reducer: {
    auth: authslice,
    aboutSlice: aboutReducer,
    senderReducers: senderRoucer,
    userLogo:userLogoReducer,
  },
});
