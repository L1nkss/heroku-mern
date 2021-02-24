import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IMovieGenres, TGenre,
} from "./types/types";

import { CONSTANT_GENRES } from "../../../constants/constants";

const initialState: IMovieGenres = {
  loading: false,
  error: false,
  list: {
    discover: {
      items: CONSTANT_GENRES,
      label: "Discover",
    },
    all: {
      items: [],
      label: "Genres",
    },
    active: CONSTANT_GENRES[0].name,
  },
};

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    getGenresRequest(state: IMovieGenres): IMovieGenres {
      return { ...state, loading: true, error: false };
    },
    getGenresSuccess(state: IMovieGenres, action: PayloadAction<TGenre[]>): IMovieGenres {
      return { ...state, loading: false, list: { ...state.list, all: { ...state.list.all, items: action.payload } } };
    },
    getGenresError(state: IMovieGenres): IMovieGenres {
      return { ...state, error: true, loading: false };
    },
    changeActive(state: IMovieGenres, action: PayloadAction<number>): IMovieGenres {
      // Общий список жанров (discover + all)
      const allGenres = [...state.list.discover.items, ...state.list.all.items];
      // Находим индекс активного жанра в массиве
      const idx = allGenres.findIndex((element) => element.id === action.payload);
      return { ...state, list: { ...state.list, active: allGenres[idx].name } };
    },
  },
});

export const {
  getGenresRequest, getGenresSuccess, changeActive, getGenresError,
} = genreSlice.actions;

export default genreSlice.reducer;
