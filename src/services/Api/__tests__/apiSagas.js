import { put, all, takeEvery, call, select } from 'redux-saga/effects';
import {
    HANDLE_ASYNC_DATA,
    PROCESS_SWAPI_API_DATA,
    setPrimitiveResponse,
    prepareAsyncDataConfig
} from 'services/Api/apiConstants';
import {
    watchAsyncApiData,
    handleAsyncDataHandler,
    processSwapiApiData,
    handleAsyncArrParam
} from 'services/Api/apiSagas';
import { staticActions } from 'containers/Character/static/staticConstants';
import { staticSelectors } from 'containers/Character/static/staticSelectors';
import {
    staticProperties,
    setCharacterStaticDetails,
    NAMESPACE
} from 'containers/Character/characterConstants';

describe('Api sagas', () => {
    let data;
    let asyncData;
    beforeAll(() => {
        data = {
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
        };
        asyncData = {
            starships: [
                'https://swapi.dev/api/starships/12/',
                'https://swapi.dev/api/starships/22/'
            ],
            homeworld: ['https://swapi.dev/api/planets/1/'],
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
            url: ['https://swapi.dev/api/people/1/']
        };
    });
    it('Watch api sagas', () => {
        const gen = watchAsyncApiData();
        expect(gen.next().value).toEqual(
            takeEvery(HANDLE_ASYNC_DATA, handleAsyncDataHandler)
        );
        expect(gen.next().value).toEqual(
            takeEvery(PROCESS_SWAPI_API_DATA, processSwapiApiData)
        );
        expect(gen.next().done).toEqual(true);
    });
    it('Map http requests and handle async data', () => {
        const action = {
            payload: {
                data: asyncData,
                finishFetchingAction: setCharacterStaticDetails,
                actions: staticActions,
                selectors: staticSelectors,
                properties: staticProperties
            }
        };
        const gen = handleAsyncDataHandler(action);
        let processedDataObj = {};
        expect(gen.next().value).toEqual(
            call(handleAsyncArrParam, {
                requestsArr: asyncData['starships'],
                selector: staticSelectors['starships'],
                property: staticProperties['starships'],
                mapChangeAction: staticActions['starships']
            })
        );
        expect(gen.next().value).toEqual(
            call(handleAsyncArrParam, {
                requestsArr: asyncData['homeworld'],
                selector: staticSelectors['homeworld'],
                property: staticProperties['homeworld'],
                mapChangeAction: staticActions['homeworld']
            })
        );
        expect(gen.next().value).toEqual(
            call(handleAsyncArrParam, {
                requestsArr: asyncData['films'],
                selector: staticSelectors['films'],
                property: staticProperties['films'],
                mapChangeAction: staticActions['films']
            })
        );
        expect(gen.next().value).toEqual(
            call(handleAsyncArrParam, {
                requestsArr: asyncData['species'],
                selector: staticSelectors['species'],
                property: staticProperties['species'],
                mapChangeAction: staticActions['species']
            })
        );
        expect(gen.next().value).toEqual(
            call(handleAsyncArrParam, {
                requestsArr: asyncData['vehicles'],
                selector: staticSelectors['vehicles'],
                property: staticProperties['vehicles'],
                mapChangeAction: staticActions['vehicles']
            })
        );
        expect(gen.next().value).toEqual(
            call(handleAsyncArrParam, {
                requestsArr: asyncData['url'],
                selector: staticSelectors['url'],
                property: staticProperties['url'],
                mapChangeAction: staticActions['url']
            })
        );
        processedDataObj = {
            homeworld: new Map([
                ['https://swapi.dev/api/planets/1/', 'Tatooine']
            ]),
            films: new Map([
                ['https://swapi.dev/api/films/2/', 'The Empire Strikes Back'],
                ['https://swapi.dev/api/films/6/', 'Revenge of the Sith'],
                ['https://swapi.dev/api/films/3/', 'Return of the Jedi'],
                ['https://swapi.dev/api/films/1/', 'A New Hope'],
                ['https://swapi.dev/api/films/7/', 'The Force Awakens']
            ]),
            species: new Map([['https://swapi.dev/api/species/1/', 'Human']]),
            vehicles: new Map([
                ['https://swapi.dev/api/vehicles/14/', 'Snowspeeder'],
                ['https://swapi.dev/api/vehicles/30/', 'Imperial Speeder Bike']
            ]),
            starships: new Map([
                ['https://swapi.dev/api/starships/12/', 'X-wing'],
                ['https://swapi.dev/api/starships/22/', 'Imperial shuttle']
            ])
        };
        expect(gen.next().value).toEqual(
            put(
                action.payload.finishFetchingAction({})
            )
        );
    });
    it('processSwapiApiData', () => {
        const action = {
            payload: {
                data,
                namespace: NAMESPACE
            }
        };
        let primativeData = {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z'
        };
        const gen = processSwapiApiData(action);
        expect(gen.next({ primativeData, namespace: NAMESPACE }).value).toEqual(
            put(setPrimitiveResponse({ primativeData, namespace: NAMESPACE }))
        );
        expect(gen.next({ asyncData, namespace: NAMESPACE }).value).toEqual(
            put(prepareAsyncDataConfig({ asyncData, namespace: NAMESPACE }))
        );
        expect(gen.next().done).toEqual(true);
    });
});
