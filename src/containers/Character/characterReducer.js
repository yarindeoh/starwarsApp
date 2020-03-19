import {
    SET_CHARACTER_DETAILS,
    SET_FILMS,
    SET_SPECIES,
    SET_STARSHIPS,
    SET_VEHICLES
} from './characterConstants';

const initialCharacterState = {
    currentCharacter: {}
};

export function characterReducer(state = initialCharacterState, action) {
    switch (action.type) {
        case SET_CHARACTER_DETAILS:
            return {
                ...state,
                currentCharacter: {
                    ...state.currentCharacter,
                    ...action.payload
                }
            };
        default:
            return state;
    }
}

const initialStaticState = {
    planet: new Map(),
    films: new Map(),
    vehicles: new Map(),
    starships: new Map(),
    species: new Map()
};

export function staticReducer(state = initialStaticState, action) {
    switch (action.type) {
        case SET_FILMS: {
            return {
                ...state,
                films: action.payload
            };
        }
        case SET_SPECIES: {
            return {
                ...state,
                species: action.payload
            };
        }
        case SET_STARSHIPS: {
            return {
                ...state,
                starships: action.payload
            };
        }
        case SET_VEHICLES: {
            return {
                ...state,
                vehicles: action.payload
            };
        }
        default:
            return state;
    }
}
