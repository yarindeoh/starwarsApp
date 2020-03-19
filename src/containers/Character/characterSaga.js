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
import {
    getFilms,
    getSpecies,
    getStarships,
    getVehicles
} from 'containers/Character/characterSelectors';

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
    mapChangeAction
) {
    const promises = [];
    const requestsMap = yield select(selector);
    requestsArr.map((req) => {
        if (!requestsMap.has(req)) {
            promises.push(call(get, req));
        }
    });
    const values = yield all(promises);
    const deltaMap = convertArrObjToMap(values, property);
    const mergedMap = new Map([...deltaMap].concat([...requestsMap]));
    yield put(mapChangeAction(mergedMap));
    return mergedMap;
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
    yield put(setCharacterDetails(processedData));
    //TODO:: add url swapi validation and make it generic!
    //TODO:: cache planets also!
    // let planetMap = yield select((state) => state.static.planets);
    processedData.homeworld = yield handleAsyncParam(data.homeworld, 'name');
    processedData.films = yield handleAsyncArrParam(
        data.films,
        getFilms,
        'title',
        setFilms
    );
    processedData.vehicles = yield handleAsyncArrParam(
        data.vehicles,
        getVehicles,
        'name',
        setVehicles
    );
    processedData.starships = yield handleAsyncArrParam(
        data.starships,
        getStarships,
        'name',
        setStarships
    );
    processedData.species = yield handleAsyncArrParam(
        data.species,
        getSpecies,
        'name',
        setSpecies
    );
    yield put(setCharacterDetails(processedData));
}

export function* watchCharacter() {
    yield takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler);
}
