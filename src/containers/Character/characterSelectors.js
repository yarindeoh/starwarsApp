import { createSelector } from 'reselect';

export const getCharacter = (state) => state.character;
export const getCharacterData = (state) => state.character.data;
export const getCharacterStaticData = (state) => state.character.staticData;
export const getCurrCharacterFilms = (state) =>
    state &&
    state.character &&
    state.character.staticData &&
    state.character.staticData.films;
export const getCurrCharacterFilmsArr = createSelector(
    getCurrCharacterFilms,
    (filmsMap) => {
        return filmsMap && Array.from(filmsMap.values());
    }
);
export const getCurrCharacterSpecies = (state) =>
    state &&
    state.character &&
    state.character.staticData &&
    state.character.staticData.species;
export const getCurrCharacterSpeciesArr = createSelector(
    getCurrCharacterSpecies,
    (speciesMap) => {
        return speciesMap && Array.from(speciesMap.values());
    }
);
export const getCurrCharacterStarships = (state) =>
    state &&
    state.character &&
    state.character.staticData &&
    state.character.staticData.starships;
export const getCurrCharacterStarshipsArr = createSelector(
    getCurrCharacterStarships,
    (starshipsMap) => {
        return starshipsMap && Array.from(starshipsMap.values());
    }
);
export const getCurrCharacterVehicles = (state) =>
    state &&
    state.character &&
    state.character.staticData &&
    state.character.staticData.vehicles;
export const getCurrCharacterVehiclesArr = createSelector(
    getCurrCharacterVehicles,
    (vehiclesMap) => {
        return vehiclesMap && vehiclesMap && Array.from(vehiclesMap.values());
    }
);

export const getCurrentCharacterStaticData = createSelector(
    getCurrCharacterFilmsArr,
    getCurrCharacterSpeciesArr,
    getCurrCharacterStarshipsArr,
    getCurrCharacterVehiclesArr,
    (films, species, starships, vehicles) => {
        return {
            films,
            species,
            starships,
            vehicles
        };
    }
);
