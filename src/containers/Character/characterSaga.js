import { put, all, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'services/restUtilsSaga';
import {
    GET_CHARACTER_DETAILS,
    setCharacterDetails,
    setFilms,
    setVehicles,
    setStarships,
    setSpecies
} from 'containers/Character/characterConstants';

function* handleAsyncParam(httpRequest, key = '') {
    let result = yield call(get, httpRequest);
    return key ? result[key] : result;
}

function convertArrObjToMap(arr, property) {
    const keyValueArr = arr.map((item) => {
        return [item.url, item[property]];
    });
    return new Map(keyValueArr);
}

function* handleAsyncArrParam(
    requestsArr,
    selector,
    property,
    dispatchMapChange
) {
    const promises = [];
    const mapValues = [];
    const requestsMap = yield select(selector);
    requestsArr.map((req) => {
        //check if map has reqArr's value - if so, push value to res value
        // else push it to promises arr
        if (requestsMap.has(req)) {
            var reqValue = requestsMap.get(req);
            mapValues.push(reqValue);
        } else {
            promises.push(call(get, req));
        }
    });
    const values = yield all(promises);
    const deltaMap = convertArrObjToMap(values, property);
    const mergedMap = new Map([...deltaMap].concat([...requestsMap]));
    yield dispatchMapChange(mergedMap);
    //TODO:: refactor this line
    return [...getObjParamFromArr(values, property), ...mapValues];
}

function getObjParamFromArr(arrObj, property) {
    return arrObj.map((item) => {
        return item[property];
    });
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
    const processedData = {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender
    };
    //TODO:: add url swapi validation and make it generic!
    //TODO:: cache planets also!
    // let planetMap = yield select((state) => state.static.planets);
    processedData.homeworld = yield handleAsyncParam(data.homeworld, 'name');
    //add reselect
    //TODO:: generic func to all with selectors
    processedData.films = yield handleAsyncArrParam(
        data.films,
        (state) => state.static.films,
        'title',
        function* cb(newMap) {
            yield put(setFilms(newMap));
        }
    );
    processedData.vehicles = yield handleAsyncArrParam(
        data.vehicles,
        (state) => state.static.vehicles,
        'name',
        function* cb(newMap) {
            yield put(setVehicles(newMap));
        }
    );
    processedData.starships = yield handleAsyncArrParam(
        data.starships,
        (state) => state.static.starships,
        'name',
        function* cb(newMap) {
            yield put(setStarships(newMap));
        }
    );
    processedData.species = yield handleAsyncArrParam(
        data.species,
        (state) => state.static.species,
        'name',
        function* cb(newMap) {
            yield put(setSpecies(newMap));
        }
    );
    yield put(setCharacterDetails(processedData));
}

export function* watchCharacter() {
    yield takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler);
}
