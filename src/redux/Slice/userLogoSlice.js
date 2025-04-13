import { createSlice } from "@reduxjs/toolkit";

const logoSlice = createSlice({
  name: "logo",
  initialState: {
    logo: null,
  },
  reducers: {
    userLogoUpdate(state, action) {
        state.logo = action.payload;
    },
  },
});

export const { userLogoUpdate } = logoSlice?.actions;
export const userLogoReducer = logoSlice?.reducer;
