import { take, select, put, all, takeEvery, call } from "redux-saga/effects";
import { get } from "services/restUtilsSaga";
import {
  GET_CHARS_BY_URL,
  setCharactersData
} from "containers/Characters/charactersConstants";

function* peopleDataSaga(action) {
  let data = yield call(get, action.payload);
  yield put(setCharactersData(data));
}

export function* watchCharacters() {
  yield takeEvery(GET_CHARS_BY_URL, peopleDataSaga);
}
