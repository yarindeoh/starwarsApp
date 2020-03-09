import { SET_CHARS_DATA } from "./charactersConstants";

const initialState = {
  planetsMap: new Map(),
  currCharacters: [],
  characterCount: 0,
  nextCharacterRequest: null,
  prevCharacterRequest: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHARS_DATA:
      return {
        ...state,
        currCharacters: [...action.payload.results],
        characterCount: action.payload.count,
        nextCharacterRequest: action.payload.next,
        prevCharacterRequest: action.payload.previous
      };
    case "SET_PLANETS_MAP":
      return {
        ...state,
        planetsMap: action.payload
      };
    case "SET_CURR_PLANETS":
      return {
        ...state,
        currPlanets: action.payload.results,
        planetsCount: action.payload.count,
        nextPlanetRequest: action.payload.next
      };
    case "SEL_ALL_SPECIES":
      return {
        ...state,
        allSpecies: [...action.payload]
      };
    default:
      return state;
  }
}

export default reducer;
