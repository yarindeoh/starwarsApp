import 'isomorphic-fetch';
import { put } from 'redux-saga/effects';

import {
    startLoadingAction,
    stopLoadingAction
} from 'components/Loader/loaderConstants';
const HEADERS = {
    'Content-type': 'application/json; charset=UTF-8'
};
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export function* handleRequest(url, type, options = {}, data = {}) {
    const config = {
        ...options,
        method: type,
        // cors: 'no-cors',
        headers: HEADERS
    };
    if (type === 'POST') {
        config.body = JSON.stringify(data);
    }
    try {
        //TODO:: handle multiple loaders
        yield put(startLoadingAction());
        const response = yield fetch(url, config);
        const serverData = yield response.json();
        yield put(stopLoadingAction());
        return serverData;
    } catch (e) {
        // TODO:: handle errors with global modals
        yield put(stopLoadingAction());
        return yield Promise.reject(e);
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
            title: `${error.payload.type || 'Error'} - ${error.payload.code ||
                500}`,
            body: error.payload.message,
            type: ModalType.error
        })
    );
}

export function* watchRestErrors() {
    //   yield takeEvery(NETWORK_GENERIC_ERROR, handleRestErrors);
}
