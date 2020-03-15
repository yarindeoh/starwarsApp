import { debounce, put, takeLatest, takeEvery, call } from "redux-saga/effects";
import { get } from "services/restUtilsSaga";
import {
  GET_CHARS_BY_URL,
  GET_CHARACTER_DETAILS,
  setCharactersData,
  setCharacterDetails
} from "containers/Characters/charactersConstants";

function* charactersDataHandler(action) {
  let data = yield call(get, action.payload);
  yield put(setCharactersData(data));
}

function* characterDetailsHandler(action) {
  const { id } = action;
  const data = yield call(get, `https://swapi.co/api/people/${id}`);
  yield put(setCharacterDetails(data));
}

export function* watchCharacters() {
  //When searching onevery key event, fire saga after 500 ms at batches
  yield takeEvery(GET_CHARS_BY_URL, charactersDataHandler);
  yield takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler);
}
