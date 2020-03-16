import { SET_CHARACTER_DETAILS } from "./characterConstants";

const initialState = {
  currentCharacter: {}
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
