import {
    START_LOADING,
    STOP_LOADING
} from 'components/Loader/loaderConstants';

const initialState = {
    isLoading: false
};
const loaderReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case START_LOADING:
            return {
                isLoading: true
            };
        case STOP_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }
};

export default loaderReducer;
