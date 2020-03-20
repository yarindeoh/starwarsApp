import { createSelector } from 'reselect';

export const getFilms = (state) => state.static.films;
export const getVehicles = (state) => state.static.vehicles;
export const getStarships = (state) => state.static.starships;
export const getSpecies = (state) => state.static.species;

export const getCharacter = (state) => state.character.currentCharacter;
export const getCurrCharacterFilms = (state) =>
    state &&
    state.character &&
    state.character.currentCharacter &&
    state.character.currentCharacter.films;
export const getCurrCharacterFilmsArr = createSelector(
    getCurrCharacterFilms,
    (filmsMap) => {
        return filmsMap && Array.from(filmsMap.values());
    }
);
export const getCurrCharacterSpecies = (state) =>
    state &&
    state.character &&
    state.character.currentCharacter &&
    state.character.currentCharacter.species;
export const getCurrCharacterSpeciesArr = createSelector(
    getCurrCharacterSpecies,
    (speciesMap) => {
        return speciesMap && Array.from(speciesMap.values());
    }
);
export const getCurrCharacterStarships = (state) =>
    state &&
    state.character &&
    state.character.currentCharacter &&
    state.character.currentCharacter.starships;
export const getCurrCharacterStarshipsArr = createSelector(
    getCurrCharacterStarships,
    (starshipsMap) => {
        return starshipsMap && Array.from(starshipsMap.values());
    }
);
export const getCurrCharacterVehicles = (state) =>
    state &&
    state.character &&
    state.character.currentCharacter &&
    state.character.currentCharacter.vehicles;
export const getCurrCharacterVehiclesArr = createSelector(
    getCurrCharacterVehicles,
    (vehiclesMap) => {
        return vehiclesMap && vehiclesMap && Array.from(vehiclesMap.values());
    }
);
export const getCurrentCharacter = createSelector(
    getCharacter,
    getCurrCharacterFilmsArr,
    getCurrCharacterSpeciesArr,
    getCurrCharacterStarshipsArr,
    getCurrCharacterVehiclesArr,
    (character, films, species, starships, vehicles) => {
        return {
            ...character,
            films,
            species,
            starships,
            vehicles
        };
    }
);
