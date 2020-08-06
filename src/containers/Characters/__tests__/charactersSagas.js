import { debounce, takeEvery, call, put } from 'redux-saga/effects';
import {
    watchCharacters,
    charactersDataHandler,
    charactersPagesHandler
} from 'containers/Characters/charactersSaga';

import {
    GET_CHARS_BY_URL,
    GET_CHARS_PAGE,
    setCharactersData
} from 'containers/Characters/charactersConstants';
import Api from 'containers/Characters/charactersApi';

describe('Characters List', () => {
    let data;
    beforeAll(() => {
        data = {
            currentCharacters: [
                {
                    name: 'Luke Skywalker',
                    height: '172',
                    mass: '77',
                    hair_color: 'blond',
                    skin_color: 'fair',
                    eye_color: 'blue',
                    birth_year: '19BBY',
                    gender: 'male',
                    homeworld: 'https://swapi.dev/api/planets/1/',
                    films: [
                        'https://swapi.dev/api/films/2/',
                        'https://swapi.dev/api/films/6/',
                        'https://swapi.dev/api/films/3/',
                        'https://swapi.dev/api/films/1/',
                        'https://swapi.dev/api/films/7/'
                    ],
                    species: ['https://swapi.dev/api/species/1/'],
                    vehicles: [
                        'https://swapi.dev/api/vehicles/14/',
                        'https://swapi.dev/api/vehicles/30/'
                    ],
                    starships: [
                        'https://swapi.dev/api/starships/12/',
                        'https://swapi.dev/api/starships/22/'
                    ],
                    created: '2014-12-09T13:50:51.644000Z',
                    edited: '2014-12-20T21:17:56.891000Z',
                    url: 'https://swapi.dev/api/people/1/'
                },

                {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'https://swapi.dev/api/planets/8/',
                    films: [
                        'https://swapi.dev/api/films/2/',
                        'https://swapi.dev/api/films/5/',
                        'https://swapi.dev/api/films/4/',
                        'https://swapi.dev/api/films/6/',
                        'https://swapi.dev/api/films/3/',
                        'https://swapi.dev/api/films/1/',
                        'https://swapi.dev/api/films/7/'
                    ],
                    species: ['https://swapi.dev/api/species/2/'],
                    vehicles: [],
                    starships: [],
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'https://swapi.dev/api/people/3/'
                }
            ],
            characterCount: 87,
            nextCharacterRequest: 'https://swapi.dev/api/people/?page=2&search=',
            prevCharacterRequest: null
        };
    });
    it('Watch characters main sagas', () => {
        const gen = watchCharacters();
        expect(gen.next().value).toEqual(
            debounce(500, GET_CHARS_BY_URL, charactersDataHandler)
        );
        expect(gen.next().value).toEqual(
            takeEvery(GET_CHARS_PAGE, charactersPagesHandler)
        );
        expect(gen.next().done).toEqual(true);
    });
    it('charactersDataHandler', () => {
        const action = {
            payload: {
                querySearch: 'lu'
            }
        };
        const gen = charactersDataHandler(action);
        expect(gen.next().value).toEqual(
            call(Api.getSearchedCharacters, action.payload)
        );
        expect(gen.next(data).value).toEqual(put(setCharactersData(data)));
        expect(gen.next().done).toEqual(true);
    });
    it('charactersPagesHandler', () => {
        const action = {
            payload: {
                url: 'https://swapi.dev/api/people/?page=2&search='
            }
        };
        const gen = charactersPagesHandler(action);
        expect(gen.next().value).toEqual(
            call(Api.getAllCharacters, action.payload)
        );
        expect(gen.next(data).value).toEqual(put(setCharactersData(data)));
        expect(gen.next().done).toEqual(true);
    });
});
