import { put, takeEvery, call } from 'redux-saga/effects';
import { get } from 'services/restUtilsSaga';
import {
    GET_CHARACTER_DETAILS,
    setCharacterDetails,
    setCharacterStaticDetails,
    handleAsyncDataAction
} from 'containers/Character/characterConstants';
import { validateURLRequest } from 'services/general/generalHelpers';
import Api from 'containers/Character/characterApi';
import {
    staticActions,
    staticProperties
} from 'containers/Character/characterConstants';
import { staticSelectors } from 'containers/Character/characterSelectors';

function* characterDetailsHandler(action) {
    const data = yield call(Api.getCharacterDetails, action);
    let primativeData = {};
    let asyncData = {};
    //TODO:: handle planets and empty arrays
    Object.keys(data).map((key) => {
        let item = data[key];
        if (Array.isArray(item) && validateURLRequest(item[0])) {
            asyncData[key] = item;
        } else {
            primativeData[key] = item;
        }
        // else if (validateURLRequest(item)) {
        // asyncData[key] =
        // }
    });
    //TODO:: cache planets also!
    // let planetMap = yield select((state) => state.static.planets);
    // processedData.homeworld = yield handleAsyncParam(data.homeworld, 'name');
    yield put(setCharacterDetails(primativeData));
    yield put(
        handleAsyncDataAction({
            data: asyncData,
            finishFetchingAction: setCharacterStaticDetails,
            actions: staticActions,
            selectors: staticSelectors,
            properties: staticProperties
        })
    );
}

export function* watchCharacter() {
    yield takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler);
}
