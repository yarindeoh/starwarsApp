import { put, all, takeEvery, call, select } from 'redux-saga/effects';

import { get } from 'services/restUtilsSaga';
import { convertArrObjToMap } from 'services/general/generalHelpers';
import { HANDLE_ASYNC_DATA } from 'containers/Character/characterConstants';

/**
 *
 * @param {Array} values
 * @param {Function} mapChangeAction
 * @param {String} property
 */
function* updateStoreOfNewStaticValues(
    values,
    mapChangeAction,
    property,
    storeMap
) {
    // contains all new map values that are not in the store
    const deltaMap = convertArrObjToMap(values, property);
    const mergedMap = new Map([...deltaMap].concat([...storeMap]));
    // Update static map in the store
    yield put(mapChangeAction(mergedMap));
    return deltaMap;
}

/**
 *
 * @param {Array} requestsArr - url array from server
 * @param {Function} selector - store selector
 * @param {String} property - requied field to extract
 * @param {Function} mapChangeAction - store action on map change
 */
function* handleAsyncArrParam(
    requestsArr,
    selector,
    property,
    mapChangeAction
) {
    const promises = [];
    const storeMap = yield select(selector);
    const requestsMap = new Map();
    //TODO:: handle one param of url
    requestsArr.map((req) => {
        //check if map has reqArr's value - if so, push value to res map
        // else push it to promises arr
        if (storeMap.has(req)) {
            var reqValue = storeMap.get(req);
            requestsMap.set(req, reqValue);
        } else {
            promises.push(call(get, req));
        }
    });
    const values = yield all(promises);
    const deltaMap = yield updateStoreOfNewStaticValues(
        values,
        mapChangeAction,
        property,
        storeMap
    );
    // send back new map values and store's values
    return new Map([...requestsMap].concat([...deltaMap]));
}

function* handleAsyncParam(httpRequest, key = '') {
    let result = yield call(get, httpRequest);
    return key ? result[key] : result;
}

/**
 *
 * @param {*} data
 * @param {*} finishFetchingAction
 * @param {*} actions
 * @param {*} selectors
 * @param {*} properties
 */
function* handleAsyncDataHandler(action) {
    let processedDataObj = {};
    const {
        payload: { data, finishFetchingAction, actions, selectors, properties }
    } = action;

    for (let key in data) {
        processedDataObj[key] = yield handleAsyncArrParam(
            data[key],
            selectors[key],
            properties[key],
            actions[key]
        );
    }
    yield put(finishFetchingAction(processedDataObj));
}

export function* watchAsyncApiData() {
    yield takeEvery(HANDLE_ASYNC_DATA, handleAsyncDataHandler);
}
