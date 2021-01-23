import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "../../../redux/reducers/types/types";

// eslint-disable-next-line import/prefer-default-export
export const isFetchingDone = createSelector(
  (state: IRootState) => state,
  (allState: IRootState) => {
    const { list } = allState.genres;
    const { films } = allState.films;
    // Проверям, в массивах жанров и фильмов есть данные
    return list.length && films.length;
  },
);
