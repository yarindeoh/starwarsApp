import { debounce, put, call } from 'redux-saga/effects';
import { get } from 'services/restUtilsSaga';
import {
    GET_CHARS_BY_URL,
    setCharactersData
} from 'containers/Characters/charactersConstants';
import Api from 'containers/Characters/charactersApi';

function* charactersDataHandler(action) {
    const { payload } = action;
    let data = yield call(Api.getAllCharacters, payload);
    yield put(setCharactersData(data));
}

export function* watchCharacters() {
    //When searching onevery key event, fire saga after 500 ms at batches
    yield debounce(500, GET_CHARS_BY_URL, charactersDataHandler);
}
