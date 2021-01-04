import { put, call, takeEvery } from "redux-saga/effects";
import { getGenresRequest, getGenresSuccess } from "../reducer";
import api from "../../../../services/api";

function* getGenres() {
  try {
    const response = yield call(api.getGenres);
    yield put(getGenresSuccess(response.data.genres));
  } catch (e) {
    yield console.log("error", e);
  }
}

export default function* watchGenreSaga() {
  yield takeEvery(getGenresRequest.type, getGenres);
}
