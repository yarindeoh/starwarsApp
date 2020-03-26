export const SET_PRIMITIVE_RESPONSE = 'SET_PRIMITIVE_RESPONSE';
export const SET_ASYNC_RESPONSE = 'SET_ASYNC_RESPONSE';
export const NAMESPACE = 'Api';
export const HANDLE_ASYNC_DATA = `${NAMESPACE}/HANDLE_ASYNC_DATA`;
export const HANDLE_API_RESPONSE = `${NAMESPACE}/HANDLE_API_RESPONSE`;

export const handleAsyncDataAction = (payload) => ({
    type: HANDLE_ASYNC_DATA,
    payload
});

export const handleApiResponse = (payload) => ({
    type: HANDLE_API_RESPONSE,
    payload
});

export const setPrimitiveResponse = ({ namespace, primativeData }) => ({
    type: `${namespace}/${SET_PRIMITIVE_RESPONSE}`,
    payload: primativeData
});

export const setAsyncResponse = ({ namespace, asyncData }) => ({
    type: `${namespace}/${SET_ASYNC_RESPONSE}`,
    payload: asyncData
});
