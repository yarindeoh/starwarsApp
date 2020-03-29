import { put, all, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'services/restUtilsSaga';
import { convertArrObjToMap } from 'services/general/generalHelpers';
import { validateURLRequest } from 'services/general/generalHelpers';
import {
    HANDLE_ASYNC_DATA,
    HANDLE_API_RESPONSE,
    setPrimitiveResponse,
    setAsyncResponse
} from 'services/Api/apiConstants';

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
 * Returns a map of http data that exists in the store
 * and non fullfiled promises array to excute
 * @param {Array} requestsArr - http requests array
 * @param {Function} selector - store selector
 */
function* mapHttpRequests(requestsArr, selector) {
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
    return { requestsMap, promises, storeMap };
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
    // Mapping http array that exists in the store (which help in maps)
    const mappedHttpArrayObj = yield mapHttpRequests(requestsArr, selector);
    // Excecute fields that are not in the store
    const values = yield all(mappedHttpArrayObj.promises);
    const deltaMap = yield updateStoreOfNewStaticValues(
        values,
        mapChangeAction,
        property,
        mappedHttpArrayObj.storeMap
    );
    // send back new map values and store's values
    return new Map([...mappedHttpArrayObj.requestsMap].concat([...deltaMap]));
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

function* handleApiResponse(action) {
    const {
        payload: { data, namespace }
    } = action;
    let primativeData = {};
    let asyncData = {};

    Object.keys(data).map((key) => {
        let item = data[key];
        if (Array.isArray(item) && validateURLRequest(item[0])) {
            asyncData[key] = item;
        } else if (typeof item === 'string') {
            if (validateURLRequest(item)) {
                asyncData[key] = [item];
            } else {
                primativeData[key] = item;
            }
        }
    });
    yield put(setPrimitiveResponse({ primativeData, namespace }));
    yield put(setAsyncResponse({ asyncData, namespace }));
}

export function* watchAsyncApiData() {
    yield takeEvery(HANDLE_ASYNC_DATA, handleAsyncDataHandler);
    yield takeEvery(HANDLE_API_RESPONSE, handleApiResponse);
}
