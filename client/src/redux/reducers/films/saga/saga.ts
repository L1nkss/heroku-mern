import {
  put, call, takeEvery, select,
} from "redux-saga/effects";
import {
  getFilmsRequest, getFilmsSuccess, loadAdditionFilmsSuccess, loadAdditionFilmsRequest,
} from "../reducer";
import { changeActive } from "../../genre/reducer";
import { IRootState } from "../../types/types";
import { GENRES_TYPES_TO_SERVER } from "../../../../constants/constants";
import api from "../../../../services/api";
import FilmAdapter from "../../../../utils/adapters/film";
import { isStringsEqual } from "../../../../utils/helpers";

const getTypeOfActiveGenre = (state: IRootState): string | number => {
  // Получаем активный жанр
  const activeGenre = state.genres.list.active;
  // Проверяем, является ли жанр общим(discover)
  const isDiscover = [...state.genres.list.discover.items]
    .some((element) => isStringsEqual(element.name, activeGenre));
  // Если жанр является общим
  if (isDiscover) {
    return activeGenre;
  }
  // Все жанры
  const allGenres = state.genres.list.all.items;
  // Находим индекс жанра в списке всех жанров
  const idx = allGenres.findIndex((element) => element.name === activeGenre);
  // возвращаем ID жанра
  return allGenres[idx].id;
};

const getTotalPages = (state: IRootState) => state.films.totalPages;
const getCurrentPage = (state: IRootState) => state.films.page;

// Сага для запуска обновления фильмов, если изменился жанр
function* updateFilmList() {
  try {
    yield put(getFilmsRequest());
  } catch (e) {
    yield console.log("error", e);
  }
}

// Сага для загрузки большего количество фильмов
function* getAdditionFilms() {
  try {
    const totalPages = yield select(getTotalPages);
    const currentPage = yield select(getCurrentPage);
    const activeGenre = yield select(getTypeOfActiveGenre);

    if (currentPage + 1 <= totalPages) {
      const param = { page: currentPage + 1 };
      const response = (typeof activeGenre === "string")
        ? yield call(api.getFilms, GENRES_TYPES_TO_SERVER[activeGenre], param)
        : yield call(api.discoverFilms, { with_genres: activeGenre, ...param });

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
    // let response;

    const activeGenre = yield select(getTypeOfActiveGenre);
    // Проверяем к какому типу относится активный жанр discover или all
    const response = (typeof activeGenre === "string")
      ? yield call(api.getFilms, GENRES_TYPES_TO_SERVER[activeGenre])
      : yield call(api.discoverFilms, { with_genres: activeGenre });

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
  yield takeEvery(changeActive.type, updateFilmList);
  yield takeEvery(loadAdditionFilmsRequest.type, getAdditionFilms);
}
