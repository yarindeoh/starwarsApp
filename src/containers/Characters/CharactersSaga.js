import { debounce, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_CHARS_BY_URL,
    GET_CHARS_PAGE,
    setCharactersData
} from 'containers/Characters/charactersConstants';
import Api from 'containers/Characters/charactersApi';
import { convertArrObjToMap } from 'services/general/generalHelpers';

function* charactersDataHandler(action) {
    const { payload } = action;
    let data = yield call(Api.getSearchedCharacters, payload);
    // console.log(data);
    // let dataMap = convertArrObjToMap(data.results);
    // console.log(dataMap);
    yield put(setCharactersData(data));
}

function* charactersPagesHandler(action) {
    const { payload } = action;
    let data = yield call(Api.getAllCharacters, payload);
    yield put(setCharactersData(data));
}

export function* watchCharacters() {
    //When searching onevery key event, fire saga after 500 ms at batches
    yield debounce(500, GET_CHARS_BY_URL, charactersDataHandler);
    yield takeEvery(GET_CHARS_PAGE, charactersPagesHandler);
}
