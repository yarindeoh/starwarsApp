export const NAMESPACE = 'loader';
export const START_LOADING = `${NAMESPACE}/START_LOADING`;
export const STOP_LOADING = `${NAMESPACE}/STOP_LOADING`;

export const startLoadingAction = () => ({
    type: START_LOADING,
    payload: { isLoading: true }
});

export const stopLoadingAction = () => ({
    type: STOP_LOADING,
    payload: { isLoading: false }
});