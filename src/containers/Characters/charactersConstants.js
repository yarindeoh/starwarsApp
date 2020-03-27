export const GET_CHARS_BY_URL = 'Characters/GET_CHARS_BY_URL';
export const SET_CHARS_DATA = 'Characters/SET_CHARS_DATA';
export const GET_CHARS_PAGE = 'Characters/GET_CHARS_PAGE';

export const getAllCharacters = (payload) => ({
    type: GET_CHARS_BY_URL,
    payload
});
export const getCharactersPage = (payload) => ({
    type: GET_CHARS_PAGE,
    payload
});

export const setCharactersData = (payload) => ({
    type: SET_CHARS_DATA,
    payload
});
