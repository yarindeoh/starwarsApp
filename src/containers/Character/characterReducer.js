import {
    SET_PRIMITIVE_RESPONSE,
    SET_CHARACTER_STATIC_DETAILS,
    RESET_CURRENT_CHARACTER
} from './characterConstants';

function characterReducer(state = {}, action) {
    switch (action.type) {
        case SET_PRIMITIVE_RESPONSE:
            return {
                ...state,
                data: { ...action.payload }
            };
        case SET_CHARACTER_STATIC_DETAILS: {
            return {
                ...state,
                staticData: { ...action.payload }
            };
        }
        case RESET_CURRENT_CHARACTER:
            return {};
        default:
            return state;
    }
}

export default characterReducer;
