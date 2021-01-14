import { all } from "redux-saga/effects";
import watchGenreSaga from "../reducers/genre/saga/saga";
import watchFilmsSaga from "../reducers/films/saga/saga";

export default function* rootSaga() {
  yield all([
    watchGenreSaga(),
    watchFilmsSaga(),
  ]);
}
