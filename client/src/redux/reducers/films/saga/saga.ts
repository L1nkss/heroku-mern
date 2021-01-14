import {
  put, call, takeEvery, select,
} from "redux-saga/effects";
import { getFilmsRequest, getFilmsSuccess } from "../reducer";
import { changeCategory, changeActiveGenre } from "../../genre/reducer";
import { IRootState } from "../../types/types";
import { GENRES_TYPES_TO_SERVER } from "../../../../constants/constants";
import api from "../../../../services/api";
import FilmAdapter from "../utils/filmAdapter";
import { isStringsEqual } from "../../../../utils/helpers";

const getActiveCategory = (state: IRootState) => state.genres.category;
const getActiveGenre = (state: IRootState) => state.genres.active;
const getActiveGenreId = (state: IRootState) => {
  const allGenres = state.genres.list;
  const activeGenre = state.genres.active;
  const idx = allGenres.findIndex((genre) => isStringsEqual(genre.name, activeGenre));

  return allGenres[idx].id;
};

// Генератор для запуска обновления фильмов, если изменился жанр
function* getFilmsWhenGenreUpdated() {
  try {
    yield put(getFilmsRequest());
  } catch (e) {
    yield console.log("error", e);
  }
}

function* getFilms() {
  try {
    let response;
    const activeGenre = yield select(getActiveGenre);
    if (isStringsEqual(activeGenre, "all")) {
      const activeCategory = yield select(getActiveCategory);
      response = yield call(api.getFilms, GENRES_TYPES_TO_SERVER[activeCategory]);
    } else {
      const activeGenreId = yield select(getActiveGenreId);
      response = yield call(api.discoverFilms, { with_genres: activeGenreId });
    }
    yield put(getFilmsSuccess(FilmAdapter.transformData(response.data.results)));
  } catch (e) {
    yield console.log("error", e);
  }
}

export default function* watchFilmsSaga() {
  yield takeEvery(getFilmsRequest.type, getFilms);
  yield takeEvery(changeCategory.type, getFilmsWhenGenreUpdated);
  yield takeEvery(changeActiveGenre.type, getFilmsWhenGenreUpdated);
}
