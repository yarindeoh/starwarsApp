import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import characterReducer from 'containers/Character/characterReducer';
import charactersReducer from 'containers/Characters/charactersReducer';
import staticReducer from 'containers/Character/static/staticReducer';
import loaderReducer from 'components/Loader/loaderReducer';

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        characters: charactersReducer,
        character: characterReducer,
        static: staticReducer,
        loader: loaderReducer
    });
export default createRootReducer;
