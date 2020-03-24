export const GET_CHARACTER_DETAILS = 'Characters/GET_CHARACTER_DETAILS';
export const SET_CHARACTER_DETAILS = 'Characters/SET_CHARACTER_DETAILS';
export const SET_CHARACTER_STATIC_DETAILS =
    'Characters/SET_CHARACTER_STATIC_DETAILS';
export const SET_FILMS = 'Static/SET_FILMS';
export const SET_VEHICLES = 'Static/SET_VEHICLES';
export const SET_SPECIES = 'Static/SET_SPECIES';
export const SET_STARSHIPS = 'Static/SET_STARSHIPS';
//TODO:: dynamic to api_prefix
export const HANDLE_ASYNC_DATA = 'HANDLE_ASYNC_DATA';

export const getCharacterDetails = (id) => ({
    type: GET_CHARACTER_DETAILS,
    id
});

export const setCharacterDetails = (payload) => ({
    type: SET_CHARACTER_DETAILS,
    payload
});

export const setCharacterStaticDetails = (payload) => ({
    type: SET_CHARACTER_STATIC_DETAILS,
    payload
});

//TODO:: dynamic to api_prefix
export const handleAsyncDataAction = (payload) => ({
    type: HANDLE_ASYNC_DATA,
    payload
});

//TODO:: move
//// STATIC

export const setFilms = (payload) => ({
    type: SET_FILMS,
    payload
});

export const setVehicles = (payload) => ({
    type: SET_VEHICLES,
    payload
});

export const setSpecies = (payload) => ({
    type: SET_SPECIES,
    payload
});

export const setStarships = (payload) => ({
    type: SET_STARSHIPS,
    payload
});

export const staticProperties = {
    species: 'name',
    vehicles: 'name',
    starships: 'name',
    films: 'title'
};

export const staticActions = {
    species: setSpecies,
    vehicles: setVehicles,
    starships: setStarships,
    films: setFilms
};


