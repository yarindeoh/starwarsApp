import { put, takeEvery, call, select } from 'redux-saga/effects';
import {
    GET_CHARACTER_DETAILS,
    NAMESPACE,
    CURRENT_CHARACTER_CHANGED,
    ASYNC_CHARACTER_DATA,
    setCharacterStaticDetails,
    getCharacterDetails,
    staticProperties
} from 'containers/Character/characterConstants';
import { getCharacter } from 'containers/Character/characterSelectors';
import {
    handleApiResponse,
    SET_ASYNC_RESPONSE,
    handleAsyncDataAction
} from 'services/Api/apiConstants';
import Api from 'containers/Character/characterApi';
import { staticActions } from 'containers/Character/static/staticConstants';
import { staticSelectors } from 'containers/Character/static/staticSelectors';

export function* characterDetailsHandler(action) {
    const data = yield call(Api.getCharacterDetails, action);
    yield handleCharacterApiData({ payload: data });
}

export function* handleCharacterApiData({ payload }) {
    yield put(handleApiResponse({ data: payload, namespace: NAMESPACE }));
}

export function* handleCharacterAsyncData({ payload }) {
    let { url, ...newPayload } = payload;
    yield put(
        handleAsyncDataAction({
            data: newPayload,
            finishFetchingAction: setCharacterStaticDetails,
            actions: staticActions,
            selectors: staticSelectors,
            properties: staticProperties
        })
    );
}

/**
 * Handle a case When current character is changing when refreshing
 * the page and characterData store value is empty
 * @param {Object} action redux action
 * @param {String} id of requested character
 */
export function* handleCurrentCharacterChanged(action) {
    const { payload: id } = action;
    const characterData = yield select(getCharacter);
    if (!Object.entries(characterData).length) {
        yield put(getCharacterDetails(id));
    }
}

export function* watchCharacter() {
    yield takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler);
    yield takeEvery(ASYNC_CHARACTER_DATA, handleCharacterApiData);
    yield takeEvery(CURRENT_CHARACTER_CHANGED, handleCurrentCharacterChanged);
    yield takeEvery(
        `${NAMESPACE}/${SET_ASYNC_RESPONSE}`,
        handleCharacterAsyncData
    );
}
