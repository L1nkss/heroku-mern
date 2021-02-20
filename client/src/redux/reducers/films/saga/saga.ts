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

// const getActiveCategory = (state: IRootState) => state.genres.category;
// const getActiveGenre = (state: IRootState) => state.genres.active;
// const getActiveGenre = (state: IRootState) => state.genres.list.active;
// const isActiveGenreDiscover = (state: IRootState) => {
// //   const activeGenre = state.genres.list.active;
// //   const discoverItems = state.genres.list.discover;
// //   return discoverItems.some((element) => isStringsEqual(element.name, activeGenre));
// // };
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
// const getActiveGenreId = (state: IRootState) => {
//   const allGenres = state.genres.list;
//   const activeGenre = state.genres.active;
//   const idx = allGenres.findIndex((genre) => isStringsEqual(genre.name, activeGenre));
//
//   return allGenres[idx].id;
// };

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
  // try {
  //   let response;
  //   const totalPages = yield select(getTotalPages);
  //   const currentPage = yield select(getCurrentPage);
  //   const activeGenre = yield select(getActiveGenre);
  //
  //   if (currentPage + 1 <= totalPages) {
  //     if (isStringsEqual(activeGenre, "all")) {
  //       const activeCategory = yield select(getActiveCategory);
  //       response = yield call(api.getFilms, GENRES_TYPES_TO_SERVER[activeCategory], {
  //         page: currentPage + 1,
  //       });
  //     } else {
  //       const activeGenreId = yield select(getActiveGenreId);
  //       response = yield call(api.discoverFilms, { with_genres: activeGenreId, page: currentPage + 1 });
  //     }
  //     yield put(loadAdditionFilmsSuccess({
  //       films: FilmAdapter.transformData(response.data.results),
  //     }));
  //   }
  // } catch (e) {
  //   yield console.log("error", e);
  // }
}

function* getFilms() {
  try {
    // let response;

    const activeGenre = yield select(getTypeOfActiveGenre);
    // Проверяем к какому типу относится активный жанр discover или all
    const response = (typeof activeGenre === "string")
      ? yield call(api.getFilms, GENRES_TYPES_TO_SERVER[activeGenre])
      : yield call(api.discoverFilms, { with_genres: activeGenre });
    // if (isStringsEqual(activeGenre, "all")) {
    //   const activeCategory = yield select(getActiveCategory);
    //   response = yield call(api.getFilms, GENRES_TYPES_TO_SERVER[activeCategory]);
    // } else {
    //   const activeGenreId = yield select(getActiveGenreId);
    //   response = yield call(api.discoverFilms, { with_genres: activeGenreId });
    // }
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
  // yield takeEvery(changeCategory.type, getFilmsWhenGenreUpdated);
  // yield takeEvery(changeActiveGenre.type, getFilmsWhenGenreUpdated);
  yield takeEvery(loadAdditionFilmsRequest.type, getAdditionFilms);
}
