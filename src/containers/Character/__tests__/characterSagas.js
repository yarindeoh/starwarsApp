import { takeEvery, call, put, select } from 'redux-saga/effects';
import {
    watchCharacter,
    characterDetailsHandler,
    handleCharacterApiData,
    handleCurrentCharacterChanged,
    handlePrepareCharacterAsyncData
} from 'containers/Character/characterSaga';
import {
    GET_CHARACTER_DETAILS,
    NAMESPACE,
    CURRENT_CHARACTER_CHANGED,
    ASYNC_CHARACTER_DATA,
    getCharacterDetails
} from 'containers/Character/characterConstants';
import Api from 'containers/Character/characterApi';
import {
    PREPARE_ASYNC_DATA_CONFIG,
    processSwapiApiData
} from 'services/Api/apiConstants';
import { getCharacter } from 'containers/Character/characterSelectors';

describe('Character Details Page', () => {
    let data;
    beforeAll(() => {
        const data = {
            name: 'Darth Vader',
            height: '202',
            mass: '136',
            hair_color: 'none',
            skin_color: 'white',
            eye_color: 'yellow',
            birth_year: '41.9BBY',
            gender: 'male',
            homeworld: 'https://swapi.co/api/planets/1/',
            films: [
                'https://swapi.co/api/films/2/',
                'https://swapi.co/api/films/6/',
                'https://swapi.co/api/films/3/',
                'https://swapi.co/api/films/1/'
            ],
            species: ['https://swapi.co/api/species/1/'],
            vehicles: [],
            starships: ['https://swapi.co/api/starships/13/'],
            created: '2014-12-10T15:18:20.704000Z',
            edited: '2014-12-20T21:17:50.313000Z',
            url: 'https://swapi.co/api/people/4/'
        };
    });
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
                handlePrepareCharacterAsyncData
            )
        );
        expect(gen.next().done).toEqual(true);
    });
    it('Get character details and pass to swapi api middleware', () => {
        const action = {
            payload: {
                id: '4'
            }
        };
        const gen = characterDetailsHandler(action);
        expect(gen.next().value).toEqual(call(Api.getCharacterDetails, action));
        expect(gen.next(data).value).toEqual(
            call(handleCharacterApiData, { payload: data })
        );
    });
    it('Pass Api data to api saga middlewar to handle', () => {
        const action = {
            payload: data
        };
        const gen = handleCharacterApiData(action);
        expect(gen.next().value).toEqual(
            put(
                processSwapiApiData({
                    data: action.payload,
                    namespace: NAMESPACE
                })
            )
        );
    });
    it('Current character changed', () => {
        const action = {
            payload: data
        };
        const emptyCHaracterStore = {};
        const characterData = data;
        const gen = handleCurrentCharacterChanged(action);
        expect(gen.next().value).toEqual(select(getCharacter));
        expect(gen.next(emptyCHaracterStore).value).toEqual(
            put(getCharacterDetails(characterData))
        );
        expect(gen.next(characterData).done).toEqual(true);
    });
    it('Prepare character config for handeling async data in swapi api saga', () => {
        const action = {
            payload: data
        };
        const gen = handlePrepareCharacterAsyncData(action);
        // expect(gen.next().value).toEqual(
        //     put(
        //         handleAsyncDataAction({
        //             data: data,
        //             finishFetchingAction: setCharacterStaticDetails,
        //             actions: staticActions,
        //             selectors: staticSelectors,
        //             properties: staticProperties
        //         })
        //     )
        // );
    });
});
