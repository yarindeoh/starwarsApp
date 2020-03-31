import { takeEvery, call, put } from 'redux-saga/effects';
import {
    watchCharacter,
    characterDetailsHandler,
    handleCharacterApiData,
    handleCurrentCharacterChanged,
    handleCharacterAsyncData
} from 'containers/Character/characterSaga';
import {
    GET_CHARACTER_DETAILS,
    NAMESPACE,
    CURRENT_CHARACTER_CHANGED,
    ASYNC_CHARACTER_DATA
} from 'containers/Character/characterConstants';
import { PREPARE_ASYNC_DATA_CONFIG } from 'services/Api/apiConstants';

describe('Character Details Page', () => {
    it('Watch characters main sagas', () => {
        const gen = watchCharacter();
        expect(gen.next().value).toEqual(
            takeEvery(GET_CHARACTER_DETAILS, characterDetailsHandler)
        );
        expect(gen.next().value).toEqual(
            takeEvery(ASYNC_CHARACTER_DATA, handleCharacterApiData)
        );
        expect(gen.next().value).toEqual(
            takeEvery(CURRENT_CHARACTER_CHANGED, handleCurrentCharacterChanged)
        );
        expect(gen.next().value).toEqual(
            takeEvery(
                `${NAMESPACE}/${PREPARE_ASYNC_DATA_CONFIG}`,
                handleCharacterAsyncData
            )
        );
        expect(gen.next().done).toEqual(true);
    });
});
