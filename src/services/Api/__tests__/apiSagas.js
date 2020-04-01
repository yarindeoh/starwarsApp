import { put, all, takeEvery, call, select } from 'redux-saga/effects';
// import { get } from 'services/restUtilsSaga';
// import { convertArrObjToMap, validateURLRequest } from 'services/general/generalHelpers';
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
    setCharacterStaticDetails
} from 'containers/Character/characterConstants';

describe('Api sagas', () => {
    let data;
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
            homeworld: 'https://swapi.co/api/planets/1/',
            films: [
                'https://swapi.co/api/films/2/',
                'https://swapi.co/api/films/6/',
                'https://swapi.co/api/films/3/',
                'https://swapi.co/api/films/1/',
                'https://swapi.co/api/films/7/'
            ],
            species: ['https://swapi.co/api/species/1/'],
            vehicles: [
                'https://swapi.co/api/vehicles/14/',
                'https://swapi.co/api/vehicles/30/'
            ],
            starships: [
                'https://swapi.co/api/starships/12/',
                'https://swapi.co/api/starships/22/'
            ],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z',
            url: 'https://swapi.co/api/people/1/'
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
        const asyncData = {
            starships: [
                'https://swapi.co/api/starships/12/',
                'https://swapi.co/api/starships/22/'
            ],
            homeworld: 'https://swapi.co/api/planets/1/',
            films: [
                'https://swapi.co/api/films/2/',
                'https://swapi.co/api/films/6/',
                'https://swapi.co/api/films/3/',
                'https://swapi.co/api/films/1/',
                'https://swapi.co/api/films/7/'
            ],
            species: ['https://swapi.co/api/species/1/'],
            vehicles: [
                'https://swapi.co/api/vehicles/14/',
                'https://swapi.co/api/vehicles/30/'
            ]
        };
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
        const processedDataObj = {};
        // console.log(gen.next().value);
        // expect(gen.next().value).toEqual(call(handleAsyncArrParam, {}));
        // expect(gen.next().value).toEqual(
        //     call(handleAsyncArrParam, )
        // expect(gen.next(action).value).toEqual(
        //     call(handleAsyncArrParam)
        // );
        // {
        //         requestsArr: action.payload.data.starships,
        //         selector: action.payload.selectors.starships,
        //         property: action.payload.properties.starships,
        //         mapChangeAction: action.payload.actions.starships
        //     }
    });
});
