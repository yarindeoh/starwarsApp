import {
  put,
  all,
  takeEvery,
  call
} from "redux-saga/effects";
import { get } from "services/restUtilsSaga";
import {
  GET_CHARACTER_DETAILS,
  setCharacterDetails
} from "containers/Character/characterConstants";

function* handleAsyncParam(httpRequest, key = "") {
  let result = yield call(get, httpRequest);
  return key ? result[key] : result;
}

function* handleAsyncArrParam(requestsArr) {
  const promises = [];
  requestsArr.forEach(function(value, key) {
    promises.push(call(get, value));
  });
  const values = yield all(promises);
  return values;
}

function getObjParamFromArr(arrObj, property) {
  return arrObj.map(item => {
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
    gender,
    starships
  } = data;
  const processedData = {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    starships
  };
  //TODO:: add url swapi validation and make it generic!
  processedData.homeworld = yield handleAsyncParam(data.homeworld, "name");
  processedData.films = getObjParamFromArr(
    yield handleAsyncArrParam(data.films),
    "title"
  );
  processedData.vehicles = getObjParamFromArr(
    yield handleAsyncArrParam(data.vehicles),
    "name"
  );
  processedData.starships = getObjParamFromArr(
    yield handleAsyncArrParam(data.starships),
    "name"
  );
  yield put(setCharacterDetails(processedData));
}

export function* watchCharacter() {
  yield takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler);
}
