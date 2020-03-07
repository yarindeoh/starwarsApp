import { fork } from 'redux-saga/effects';

import { initTranslationSaga } from 'services/i18n/translationSaga';
import { peopleDataSaga } from 'containers/Characters/CharactersSaga'

export default function* rootSaga() {
    yield fork(initTranslationSaga);
    yield fork(peopleDataSaga);
}
