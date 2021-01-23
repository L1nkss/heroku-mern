import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loaded: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<boolean>) {
      return { ...state, loaded: action.payload };
    },
  },
});

export const { setAppStatus } = appSlice.actions;

export default appSlice.reducer;
