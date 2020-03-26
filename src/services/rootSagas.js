import { fork, all } from 'redux-saga/effects';

import { watchCharacters } from 'containers/Characters/charactersSaga';
import { watchCharacter } from 'containers/Character/characterSaga';
import { watchAsyncApiData } from 'services/Api/apiSagas';

export default function* rootSaga() {
    yield all([
        fork(watchAsyncApiData),
        fork(watchCharacters),
        fork(watchCharacter)
    ]);
}
