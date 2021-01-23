import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { IInitialUserState, TUserData } from "./types/types";

const defaultUserData = {
  username: "",
  email: "",
  id: "",
};

const initialState: IInitialUserState = {
  isLogin: false,
  loading: false,
  data: defaultUserData,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserDataRequest(state: IInitialUserState) {
      return { ...state, loading: true };
    },
    getUserDataSuccess(state: IInitialUserState, action: PayloadAction<TUserData>) {
      return {
        ...state, loading: false, isLogin: true, data: action.payload,
      };
    },
    setUserData(state: IInitialUserState, action: PayloadAction<TUserData>): void {
      state.data = action.payload;
      state.isLogin = true;
    },
    // Возможно можно сделать проще через setUserData и передачу пустого экшена
    setUserDataToDefault(state: IInitialUserState): void {
      state.data = defaultUserData;
      state.isLogin = false;
    },
    setLoginStatus(state: IInitialUserState, action: PayloadAction<boolean>) {
      return { ...state, isLogin: action.payload };
    },
  },
});

export const {
  setUserData, setUserDataToDefault, setLoginStatus, getUserDataRequest, getUserDataSuccess,
} = userSlice.actions;

export default userSlice.reducer;
