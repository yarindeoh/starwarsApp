import { SET_CHARACTER_DETAILS } from "./characterConstants";

const initialState = {
  currentCharacter: {},
  planet: new Map(),
  films: new Map(),
  vehicles: new Map(),
  starships: new Map()
};

function reducer(state = initialState, action) {
  switch (action.type) {
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
