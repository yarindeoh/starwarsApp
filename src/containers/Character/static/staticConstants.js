export const NAMESPACE = 'Static';
export const SET_FILMS = `${NAMESPACE}/SET_FILMS`;
export const SET_VEHICLES = `${NAMESPACE}/SET_VEHICLES`;
export const SET_SPECIES = `${NAMESPACE}/SET_SPECIES`;
export const SET_STARSHIPS = `${NAMESPACE}/SET_STARSHIPS`;
export const SET_HOMEWORLD = `${NAMESPACE}/SET_HOMEWORLD`;

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
export const setHomeworld = (payload) => ({
    type: SET_HOMEWORLD,
    payload
});

export const staticActions = {
    species: setSpecies,
    vehicles: setVehicles,
    starships: setStarships,
    films: setFilms,
    homeworld: setHomeworld
};
