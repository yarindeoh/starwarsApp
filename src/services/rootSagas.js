import { fork, all } from "redux-saga/effects";

import { initTranslationSaga } from "services/i18n/translationSaga";
import { watchCharacters } from "containers/Characters/charactersSaga";
import { watchCharacter } from "containers/Character/characterSaga";

export default function* rootSaga() {
  yield all([
    fork(initTranslationSaga),
    fork(watchCharacters),
    fork(watchCharacter)
  ]);
}
