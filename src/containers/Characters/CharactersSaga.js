import { debounce, put, takeEvery, call } from 'redux-saga/effects';
import { get } from 'services/restUtilsSaga';
import {
    GET_CHARS_BY_URL,
    setCharactersData
} from 'containers/Characters/charactersConstants';

function* charactersDataHandler(action) {
    let data = yield call(get, action.payload);
    yield put(setCharactersData(data));
}

export function* watchCharacters() {
    //When searching onevery key event, fire saga after 500 ms at batches
    yield debounce(500, GET_CHARS_BY_URL, charactersDataHandler);
    // yield takeEvery(GET_CHARS_BY_URL, charactersDataHandler);
}
