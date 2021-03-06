import { put, call, takeEvery } from "redux-saga/effects";

import { RoutePathes } from "../../../../constants/constants";
import api from "../../../../services/api";
import { getGenresRequest, getGenresSuccess, getGenresError } from "../reducer";
import history from "../../../../utils/history";

function* getGenres() {
  try {
    const response = yield call(api.getGenres);
    // добавляем жанры с сервера + константное значение для всех фильмов
    yield put(getGenresSuccess(response.data.genres));
  } catch (e) {
    yield put(getGenresError());
    history.push(RoutePathes.ERROR);
  }
}

export default function* watchGenreSaga() {
  yield takeEvery(getGenresRequest.type, getGenres);
}
