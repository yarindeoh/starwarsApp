import { createSelector } from 'reselect';

export const getFilms = (state) => state.static.films;
export const getVehicles = (state) => state.static.vehicles;
export const getStarships = (state) => state.static.starships;
export const getSpecies = (state) => state.static.species;

export const getCharacter = (state) => state.character.currentCharacter;
export const getCurrCharacterFilms = (state) =>
    state.character.currentCharacter.films;
export const getCurrCharacterSpecies = (state) =>
    state.character.currentCharacter.species;
export const getCurrCharacterStarships = (state) =>
    state.character.currentCharacter.starships;
export const getCurrCharacterVehicles = (state) =>
    state.character.currentCharacter.vehicles;
export const getCurrentCharacter = createSelector(
    getCharacter,
    getCurrCharacterFilms,
    getCurrCharacterSpecies,
    getCurrCharacterStarships,
    getCurrCharacterVehicles,
    (character, films, species, starships, vehicles) => {
        return {
            ...character,
            films: films && Array.from(films.values()),
            species: species && Array.from(species.values()),
            starships: starships && Array.from(starships.values()),
            vehicles: vehicles && Array.from(starships.values())
        };
    }
);
