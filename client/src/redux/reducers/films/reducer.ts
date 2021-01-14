import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { IClientFilmData } from "./types/types";

export interface IFilmState {
  films: Array<IClientFilmData>,
  loading: boolean,
  error: boolean
}

const initialState: IFilmState = {
  films: [],
  loading: false,
  error: false,
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    getFilmsRequest(state) {
      state.loading = true;
      state.error = false;
    },
    getFilmsSuccess(state, action) {
      state.loading = false;
      state.films = action.payload;
    },
  },
});

export const { getFilmsRequest, getFilmsSuccess } = filmsSlice.actions;

export default filmsSlice.reducer;
