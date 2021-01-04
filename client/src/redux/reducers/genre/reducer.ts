import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

import { IGenres, TCategoryListItem } from "./types/types";

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
  list: [{
    id: 63467,
    name: "All",
  }],
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
    getGenresSuccess(state: IGenres, action: PayloadAction<Array<IGenres>>): void {
      const newGenres = [...current(state.list)]; // берем текущий массив жанров
      action.payload.forEach((element: any) => { // добавляем жанры с api
        newGenres.push(element);
      });
      state.loading = false;
      state.list = newGenres;
    },
    getGenresError(state): void {
      state.error = true;
      state.loading = false;
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
  getGenresRequest, getGenresSuccess, changeActiveGenre, changeCategory,
} = genreSlice.actions;

export default genreSlice.reducer;
