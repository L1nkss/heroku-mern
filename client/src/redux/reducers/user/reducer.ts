import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { IInitialUserState } from "./types/types";

const initialState: IInitialUserState = {
  isLogin: false,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginStatus(state: IInitialUserState, action: PayloadAction<boolean>): void {
      state.isLogin = action.payload;
    },
  },
});

export const { setLoginStatus } = userSlice.actions;

export default userSlice.reducer;
