import { createSlice } from "@reduxjs/toolkit";
import { IClientFilmData } from "./types/types";

export interface IFilmState {
  films: Array<IClientFilmData>,
  loading: boolean,
  error: boolean
  page: number,
  totalPages: number,
  loadingAdditionFilms: boolean,
  isSearching: boolean
}

const initialState: IFilmState = {
  films: [],
  loading: false,
  error: false,
  page: 1,
  totalPages: 1,
  loadingAdditionFilms: false,
  isSearching: false,
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    getFilmsRequest(state) {
      return { ...state, loading: true, error: false };
    },
    getFilmsSuccess(state, action) {
      const { totalPages, page, films } = action.payload;
      return {
        ...state, loading: false, films, page, totalPages,
      };
    },
    loadAdditionFilmsRequest(state) {
      return { ...state, loadingAdditionFilms: true };
    },
    loadAdditionFilmsSuccess(state, action) {
      return {
        ...state, films: [...state.films, ...action.payload.films], page: state.page + 1, loadingAdditionFilms: false,
      };
    },
    changeSearchStatus(state, action) {
      return { ...state, isSearching: action.payload };
    },
  },
});

export const {
  getFilmsRequest, getFilmsSuccess, loadAdditionFilmsSuccess, loadAdditionFilmsRequest, changeSearchStatus,
} = filmsSlice.actions;

export default filmsSlice.reducer;
