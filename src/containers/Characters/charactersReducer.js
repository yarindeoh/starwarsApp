import { SET_CHARS_DATA } from "./charactersConstants";

const initialState = {
  currentCharacters: [],
  characterCount: 0,
  nextCharacterRequest: null,
  prevCharacterRequest: null
};

function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHARS_DATA:
      return {
        ...state,
        currentCharacters: [...action.payload.results],
        characterCount: action.payload.count,
        nextCharacterRequest: action.payload.next,
        prevCharacterRequest: action.payload.previous
      };
    default:
      return state;
  }
}

export default charactersReducer;
