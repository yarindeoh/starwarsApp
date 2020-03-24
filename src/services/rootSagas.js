import { fork, all } from 'redux-saga/effects';

import { initTranslationSaga } from 'services/i18n/translationSaga';
import { watchCharacters } from 'containers/Characters/charactersSaga';
import { watchCharacter } from 'containers/Character/characterSaga';
import { watchAsyncApiData } from 'services/Api/apiSagas';

export default function* rootSaga() {
    yield all([
        fork(initTranslationSaga),
        fork(watchAsyncApiData),
        fork(watchCharacters),
        fork(watchCharacter)
    ]);
}
