import {
  put, call, takeEvery, select,
} from "redux-saga/effects";
import {
  getFilmsRequest, getFilmsSuccess, loadAdditionFilmsSuccess, loadAdditionFilmsRequest,
} from "../reducer";
import { changeCategory, changeActiveGenre } from "../../genre/reducer";
import { IRootState } from "../../types/types";
import { GENRES_TYPES_TO_SERVER } from "../../../../constants/constants";
import api from "../../../../services/api";
import FilmAdapter from "../../../../utils/adapters/film";
import { isStringsEqual } from "../../../../utils/helpers";

const getActiveCategory = (state: IRootState) => state.genres.category;
const getActiveGenre = (state: IRootState) => state.genres.active;
const getActiveGenreId = (state: IRootState) => {
  const allGenres = state.genres.list;
  const activeGenre = state.genres.active;
  const idx = allGenres.findIndex((genre) => isStringsEqual(genre.name, activeGenre));

  return allGenres[idx].id;
};

const getTotalPages = (state: IRootState) => state.films.totalPages;
const getCurrentPage = (state: IRootState) => state.films.page;

// Сага для запуска обновления фильмов, если изменился жанр
function* getFilmsWhenGenreUpdated() {
  try {
    yield put(getFilmsRequest());
  } catch (e) {
    yield console.log("error", e);
  }
}

// Сага для загрузки большего количество фильмов
function* getAdditionFilms() {
  try {
    let response;
    const totalPages = yield select(getTotalPages);
    const currentPage = yield select(getCurrentPage);
    const activeGenre = yield select(getActiveGenre);

    if (currentPage + 1 <= totalPages) {
      if (isStringsEqual(activeGenre, "all")) {
        const activeCategory = yield select(getActiveCategory);
        response = yield call(api.getFilms, GENRES_TYPES_TO_SERVER[activeCategory], {
          page: currentPage + 1,
        });
      } else {
        const activeGenreId = yield select(getActiveGenreId);
        response = yield call(api.discoverFilms, { with_genres: activeGenreId, page: currentPage + 1 });
      }
      yield put(loadAdditionFilmsSuccess({
        films: FilmAdapter.transformData(response.data.results),
      }));
    }
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
    yield put(getFilmsSuccess({
      films: FilmAdapter.transformData(response.data.results),
      page: response.data.page,
      totalPages: response.data.total_pages,
    }));
  } catch (e) {
    yield console.log("error", e);
  }
}

export default function* watchFilmsSaga() {
  yield takeEvery(getFilmsRequest.type, getFilms);
  yield takeEvery(changeCategory.type, getFilmsWhenGenreUpdated);
  yield takeEvery(changeActiveGenre.type, getFilmsWhenGenreUpdated);
  yield takeEvery(loadAdditionFilmsRequest.type, getAdditionFilms);
}
