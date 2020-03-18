export const GET_CHARACTER_DETAILS = 'Characters/GET_CHARACTER_DETAILS';
export const SET_CHARACTER_DETAILS = 'Characters/SET_CHARACTER_DETAILS';
export const SET_FILMS = 'Static/SET_FILMS';
export const SET_VEHICLES = 'Static/SET_VEHICLES';
export const SET_SPECIES = 'Static/SET_SPECIES';
export const SET_STARSHIPS = 'Static/SET_STARSHIPS';

export const getCharacterDetails = (id) => ({
    type: GET_CHARACTER_DETAILS,
    id
});

export const setCharacterDetails = (payload) => ({
    type: SET_CHARACTER_DETAILS,
    payload
});

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

