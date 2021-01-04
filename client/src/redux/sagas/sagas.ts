import { all } from "redux-saga/effects";
import watchGenreSaga from "../reducers/genre/saga/saga";

export default function* rootSaga() {
  yield all([
    watchGenreSaga(),
  ]);
}
