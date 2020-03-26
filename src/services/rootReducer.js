import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import { connectRouter } from 'connected-react-router';

import characterReducer from 'containers/Character/characterReducer';
import charactersReducer from 'containers/Characters/charactersReducer';
import staticReducer from 'containers/Character/static/staticReducer';

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        i18n: i18nReducer,
        characters: charactersReducer,
        character: characterReducer,
        static: staticReducer
    });
export default createRootReducer;
