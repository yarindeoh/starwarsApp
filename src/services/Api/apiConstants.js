export const SET_PRIMITIVE_RESPONSE = 'SET_PRIMITIVE_RESPONSE';
export const PREPARE_ASYNC_DATA_CONFIG = 'PREPARE_ASYNC_DATA_CONFIG';
export const NAMESPACE = 'Api';
export const HANDLE_ASYNC_DATA = `${NAMESPACE}/HANDLE_ASYNC_DATA`;
export const PROCESS_SWAPI_API_DATA = `${NAMESPACE}/PROCESS_SWAPI_API_DATA`;

export const handleAsyncDataAction = (payload) => ({
    type: HANDLE_ASYNC_DATA,
    payload
});

export const processSwapiApiData = (payload) => ({
    type: PROCESS_SWAPI_API_DATA,
    payload
});

export const setPrimitiveResponse = ({ namespace, primativeData }) => ({
    type: `${namespace}/${SET_PRIMITIVE_RESPONSE}`,
    payload: primativeData
});

export const prepareAsyncDataConfig = ({ namespace, asyncData }) => ({
    type: `${namespace}/${PREPARE_ASYNC_DATA_CONFIG}`,
    payload: asyncData
});
