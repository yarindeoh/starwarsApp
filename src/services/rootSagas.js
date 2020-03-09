import { fork, all } from 'redux-saga/effects';

import { initTranslationSaga } from 'services/i18n/translationSaga';
import { watchCharacters } from 'containers/Characters/charactersSaga'

export default function* rootSaga() {
 yield all([
        fork(initTranslationSaga),
        fork(watchCharacters)
    ]);
}
