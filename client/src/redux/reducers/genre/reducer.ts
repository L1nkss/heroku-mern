import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

import { IGenres, TCategoryListItem, TGenre } from "./types/types";

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

const initialState: IGenres = {
  loading: false,
  error: false,
  list: [],
  active: "All",
  category: "Now playing", // катерогии фильмов при выборе жанра All
  categoryList,
};

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    getGenresRequest(state: IGenres): void {
      state.loading = true;
      state.error = false;
    },
    getGenresSuccess(state: IGenres, action: PayloadAction<TGenre[]>): void {
      state.loading = false;
      state.list = action.payload;
    },
    getGenresError(state) {
      return { ...state, error: true, loading: false };
    },
    changeActiveGenre(state, action: PayloadAction<number>): void {
      const idx = current(state.list).findIndex((element) => element.id === action.payload);
      state.active = current(state.list)[idx].name;
    },
    changeCategory(state, action: PayloadAction<number>): void {
      const idx = current(state.categoryList).findIndex((element) => element.id === action.payload);
      state.category = current(state.categoryList)[idx].name;
    },
  },
});

export const {
  getGenresRequest, getGenresSuccess, changeActiveGenre, changeCategory, getGenresError,
} = genreSlice.actions;

export default genreSlice.reducer;
