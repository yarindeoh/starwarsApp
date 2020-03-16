import { combineReducers } from "redux";
import { i18nReducer } from "react-redux-i18n";
import { connectRouter } from "connected-react-router";

import charactersReducer from "containers/Characters/charactersReducer";
import characterReducer from "containers/Character/characterReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    i18n: i18nReducer,
    characters: charactersReducer,
    character: characterReducer
  });
export default createRootReducer;
