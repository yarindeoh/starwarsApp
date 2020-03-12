import { SET_CHARS_DATA } from "./charactersConstants";

const initialState = {
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
    default:
      return state;
  }
}

export default reducer;
