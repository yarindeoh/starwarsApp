import { put, all, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'services/restUtilsSaga';
import {
    GET_CHARACTER_DETAILS,
    setCharacterDetails,
    setCharacterStaticDetails,
    setFilms,
    setVehicles,
    setStarships,
    setSpecies,
    staticActions,
    staticProperties
} from 'containers/Character/characterConstants';
import {
    convertArrObjToMap,
    validateURLRequest
} from 'services/general/generalHelpers';
import {
    getFilms,
    getSpecies,
    getStarships,
    getVehicles,
    staticSelectors
} from 'containers/Character/characterSelectors';

function* handleAsyncParam(httpRequest, key = '') {
    let result = yield call(get, httpRequest);
    return key ? result[key] : result;
}

function* handleAsyncData(data) {
    let processedObj = {};
    for (let key in data) {
        processedObj[key] = yield handleAsyncArrParam(
            data[key],
            staticSelectors[key],
            staticProperties[key],
            staticActions[key],
            setFilms
        );
    }
    return processedObj;
}

/**
 *
 * @param {*} values
 * @param {*} mapChangeAction
 * @param {*} property
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
 * @param {array of http requests} requestsArr
 * @param {selector of static field e.g vehicls, species etc..} selector
 * @param {callback of changing static field values} mapChangeAction
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

function* characterDetailsHandler(action) {
    const { id } = action;
    const data = yield call(get, `https://swapi.co/api/people/${id}`);
    const {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender
    } = data;
    // const processedData = {
    //     name,
    //     height,
    //     mass,
    //     hair_color,
    //     skin_color,
    //     eye_color,
    //     birth_year,
    //     gender
    // };
    let primativeData = {};
    let p = {};
    Object.keys(data).map((key) => {
        let item = data[key];
        if (Array.isArray(item) && validateURLRequest(item[0])) {
            p[key] = item;
            // } else if(validateURLRequest(item)){}
        } else {
            primativeData[key] = item;
        }
    });
    //TODO:: add url swapi validation and make it generic!
    //TODO:: cache planets also!
    // let planetMap = yield select((state) => state.static.planets);
    // processedData.homeworld = yield handleAsyncParam(data.homeworld, 'name');

    yield put(setCharacterDetails(primativeData));
    let processedData = yield handleAsyncData(p);
    yield put(setCharacterStaticDetails(processedData));

    // processedData.films = yield handleAsyncArrParam(
    //     data.films,
    //     getFilms,
    //     'title',
    //     setFilms
    // );
    // processedData.vehicles = yield handleAsyncArrParam(
    //     data.vehicles,
    //     getVehicles,
    //     'name',
    //     setVehicles
    // );
    // processedData.starships = yield handleAsyncArrParam(
    //     data.starships,
    //     getStarships,
    //     'name',
    //     setStarships
    // );
    // processedData.species = yield handleAsyncArrParam(
    //     data.species,
    //     getSpecies,
    //     'name',
    //     setSpecies
    // );
    // yield put(setCharacterDetails(processedData));
}

export function* watchCharacter() {
    yield takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler);
}
