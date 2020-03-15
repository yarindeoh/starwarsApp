import "isomorphic-fetch";
import { put, call, takeEvery } from "redux-saga/effects";

const HEADERS = {
  "Content-Type": "application/json"
};
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

export function* handleRequest(url, type, options = {}, data = {}) {
  const config = {
    ...options,
    method: type,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  if (type === "POST") {
    config.body = JSON.stringify(payload);
  }
  try {
    const response = yield fetch(url, config);
    const serverData = yield response.json();
    return serverData;
  } catch (e) {
    // TODO:: handle errors
    console.error(e);
    return yield Promise.reject(json);
  }
}

export function* get(url, options = {}) {
  return yield handleRequest(url, GET, options);
}

export function* post(url, data, options = {}) {
  return yield handleRequest(url, POST, options, data);
}

export function* putAction(url, data = {}, options = {}) {
  return yield handleRequest(url, PUT, options, data);
}

export function* deleteAction(url, options = {}) {
  return yield handleRequest(url, DELETE, options);
}

function* handleRestErrors(error) {
  //TODO:: implelemnt modal and error handeling
  yield put(
    showErrorModalAction({
      title: `${error.payload.type || "Error"} - ${error.payload.code || 500}`,
      body: error.payload.message,
      type: ModalType.error
    })
  );
}

export function* watchRestErrors() {
  //   yield takeEvery(NETWORK_GENERIC_ERROR, handleRestErrors);
}
