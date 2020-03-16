export const GET_CHARACTER_DETAILS = "Characters/GET_CHARACTER_DETAILS";
export const SET_CHARACTER_DETAILS = "Characters/SET_CHARACTER_DETAILS";

export const getCharacterDetails = id => ({
  type: GET_CHARACTER_DETAILS,
  id
});

export const setCharacterDetails = payload => ({
  type: SET_CHARACTER_DETAILS,
  payload
});
