import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

import {
  IGenres, IMovieGenres, TCategoryListItem, TGenre,
} from "./types/types";
import { CONSTANT_GENRES } from "../../../constants/constants";

const categoryList: Array<TCategoryListItem> = [
  {
    id: 6542,
    name: "Now playing",
  },
  {
    id: 5655,
    name: "Popular",
  },
  {
    id: 6571,
    name: "Top Rated",
  },
  {
    id: 7823,
    name: "Upcoming",
  },
];

// const initialState: IGenres = {
// //   loading: false,
// //   error: false,
// //   list: [],
// //   active: "All",
// //   category: "Now playing", // катерогии фильмов при выборе жанра All
// //   categoryList,
// // };

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
    // getGenresRequest(state: IGenres): void {
    //   state.loading = true;
    //   state.error = false;
    // },
    // getGenresSuccess(state: IGenres, action: PayloadAction<TGenre[]>): void {
    //   state.loading = false;
    //   state.list = action.payload;
    // },
    // getGenresError(state) {
    //   return { ...state, error: true, loading: false };
    // },
    // changeActiveGenre(state, action: PayloadAction<number>): void {
    //   const idx = current(state.list).findIndex((element) => element.id === action.payload);
    //   state.active = current(state.list)[idx].name;
    // },
    // changeCategory(state, action: PayloadAction<number>): void {
    //   const idx = current(state.categoryList).findIndex((element) => element.id === action.payload);
    //   state.category = current(state.categoryList)[idx].name;
    // },
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
      // const allGenres = current([...state.list.discover.items, ...state.list.all.items]);
      const allGenres = [...state.list.discover.items, ...state.list.all.items];
      // Находим индекс активного жанра в массиве
      const idx = allGenres.findIndex((element) => element.id === action.payload);
      return { ...state, list: { ...state.list, active: allGenres[idx].name } };
    },
  },
});

// export const {
//   getGenresRequest, getGenresSuccess, changeActiveGenre, changeCategory, getGenresError,
// } = genreSlice.actions;

export const {
  getGenresRequest, getGenresSuccess, changeActive, getGenresError,
} = genreSlice.actions;

export default genreSlice.reducer;
