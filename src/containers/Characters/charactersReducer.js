import { SET_CHARS_DATA, SET_CHARACTER_DETAILS } from "./charactersConstants";

const initialState = {
  currentCharacters: [],
  characterCount: 0,
  nextCharacterRequest: null,
  prevCharacterRequest: null,
  currentCharacter: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHARS_DATA:
      return {
        ...state,
        currentCharacters: [...action.payload.results],
        characterCount: action.payload.count,
        nextCharacterRequest: action.payload.next,
        prevCharacterRequest: action.payload.previous
      };
    case SET_CHARACTER_DETAILS:
      return {
        ...state,
        currentCharacter: { ...action.payload }
      };
    default:
      return state;
  }
}

export default reducer;
