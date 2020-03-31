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
    processSwapiApiData,
    PREPARE_ASYNC_DATA_CONFIG,
    handleAsyncDataAction
} from 'services/Api/apiConstants';
import Api from 'containers/Character/characterApi';
import { staticActions } from 'containers/Character/static/staticConstants';
import { staticSelectors } from 'containers/Character/static/staticSelectors';

/**
 * Handle a case when refreshing current character 
 * @param {String} id of requested character
 */
export function* handleCurrentCharacterChanged(action) {
    const { payload: id } = action;
    const characterData = yield select(getCharacter);
    if (!Object.entries(characterData).length) {
        yield put(getCharacterDetails(id));
    }
}

/**
 * Send get request for requested character id and pass response
 * to api saga middleware to handle
 * @param {String} id of requested character
 */
export function* characterDetailsHandler(action) {
    const data = yield call(Api.getCharacterDetails, action);
    yield handleCharacterApiData({ payload: data });
}

/**
 * Fire process action for api saga to handle
 * @param {Object} data containes async properties that need to be excuted
 * @param {String} namespace of the action that will be dispatched when fullfiled
 */
export function* handleCharacterApiData({ payload }) {
    yield put(processSwapiApiData({ data: payload, namespace: NAMESPACE }));
}

/**
 * Send Character async data config - static maps data (vehicles, species, homeworld etc..)
 * config - static maps selectors, static action, properties to extract and a finish custom action
 * @param {Object} payload data json obj of async requests except for url key
 */
export function* handlePrepareCharacterAsyncData({ payload }) {
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

export function* watchCharacter() {
    yield takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler);
    yield takeEvery(ASYNC_CHARACTER_DATA, handleCharacterApiData);
    yield takeEvery(CURRENT_CHARACTER_CHANGED, handleCurrentCharacterChanged);
    yield takeEvery(
        `${NAMESPACE}/${PREPARE_ASYNC_DATA_CONFIG}`,
        handlePrepareCharacterAsyncData
    );
}
