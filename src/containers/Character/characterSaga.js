import { put, takeEvery, call } from 'redux-saga/effects';
import {
    GET_CHARACTER_DETAILS,
    NAMESPACE,
    ASYNC_CHARACTER_DATA,
    setCharacterStaticDetails,
    staticProperties
} from 'containers/Character/characterConstants';
import {
    handleApiResponse,
    SET_ASYNC_RESPONSE,
    handleAsyncDataAction
} from 'services/Api/apiConstants';
import Api from 'containers/Character/characterApi';
import { staticActions } from 'containers/Character/static/staticConstants';
import { staticSelectors } from 'containers/Character/static/staticSelectors';

function* characterDetailsHandler(action) {
    const data = yield call(Api.getCharacterDetails, action);
    //TODO:: cache planets also!
    // let planetMap = yield select((state) => state.static.planets);
    // processedData.homeworld = yield handleAsyncParam(data.homeworld, 'name');
    yield handleCharacterApiData({ payload: data });
}

function* handleCharacterApiData({ payload }) {
    yield put(handleApiResponse({ data: payload, namespace: NAMESPACE }));
}

function* handleCharacterAsyncData({ payload }) {
    yield put(
        handleAsyncDataAction({
            data: payload,
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
    yield takeEvery(
        `${NAMESPACE}/${SET_ASYNC_RESPONSE}`,
        handleCharacterAsyncData
    );
}
