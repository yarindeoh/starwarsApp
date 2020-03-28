export const NAMESPACE = 'Character';
export const GET_CHARACTER_DETAILS = `${NAMESPACE}/GET_CHARACTER_DETAILS`;
export const SET_PRIMITIVE_RESPONSE = `${NAMESPACE}/SET_PRIMITIVE_RESPONSE`;
export const RESET_CURRENT_CHARACTER = `${NAMESPACE}/RESET_CURRENT_CHARACTER`;
export const SET_CHARACTER_STATIC_DETAILS = `${NAMESPACE}/SET_CHARACTER_STATIC_DETAILS`;
export const ASYNC_CHARACTER_DATA = `${NAMESPACE}/ASYNC_CHARACTER_DATA`;
export const NAME_PROP = 'name';
export const TITLE_PROP = 'title';

export const getCharacterDetails = (id) => ({
    type: GET_CHARACTER_DETAILS,
    id
});

export const setCharacterDetails = (payload) => ({
    type: SET_PRIMITIVE_RESPONSE,
    payload
});

export const setCharacterStaticDetails = (payload) => ({
    type: SET_CHARACTER_STATIC_DETAILS,
    payload
});

export const resetCurrentCharacter = () => ({
    type: RESET_CURRENT_CHARACTER
});

export const handleAsyncCharacterDetails = (payload) => ({
    type: ASYNC_CHARACTER_DATA,
    payload
});

// Can be handled in a config file in the future
export const staticProperties = {
    species: NAME_PROP,
    vehicles: NAME_PROP,
    starships: NAME_PROP,
    films: TITLE_PROP
};
