import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    bool: false,
  },
  reducers: {
    HidentheNavAndmore(state, action) {
      state.bool = action.payload;
    },
  },
});

export const { HidentheNavAndmore } = aboutSlice.actions;
export const aboutReducer = aboutSlice.reducer;
