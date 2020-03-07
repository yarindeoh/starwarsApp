import { take, select, put, all, takeEvery, call } from "redux-saga/effects";
import { get } from "services/restUtilsSaga";
import {
  GET_CHARS_BY_URL,
  setCharactersData
} from "containers/Characters/charactersConstants";

export function* peopleDataSaga() {
  let action = yield take(GET_CHARS_BY_URL);
  let data = yield call(get, action.payload);
  yield put(setCharactersData(data));
}

export default function* rootSaga() {
  yield takeEvery(GET_CHARS_BY_URL, peopleDataSaga);
}
