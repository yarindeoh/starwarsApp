export const getFilms = (state) => state.static.films;
export const getVehicles = (state) => state.static.vehicles;
export const getStarships = (state) => state.static.starships;
export const getSpecies = (state) => state.static.species;

export const staticSelectors = {
    species: getSpecies,
    vehicles: getVehicles,
    starships: getStarships,
    films: getFilms
};
