export const GET_CHARS_BY_URL = "Characters/GET_CHARS_BY_URL";
export const GET_CHARACTER_DETAILS = "Characters/GET_CHARACTER_DETAILS";
export const SET_CHARS_DATA = "Characters/SET_CHARS_DATA";
export const SET_CHARACTER_DETAILS = "Characters/SET_CHARACTER_DETAILS";

export const getAllCharacters = payload => ({
  type: GET_CHARS_BY_URL,
  payload
});

export const setCharactersData = payload => ({
  type: SET_CHARS_DATA,
  payload
});

export const getCharacterDetails = id => ({
  type: GET_CHARACTER_DETAILS,
  id
});

export const setCharacterDetails = payload => ({
  type: SET_CHARACTER_DETAILS,
  payload
});
