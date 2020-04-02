import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { ConnectedRouter } from 'connected-react-router';

import createRootReducer from 'services/rootReducer';
import rootSaga from 'services/rootSagas';
import { App } from './App';
import Loader from 'components/Loader/LoaderView';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

const composeEnhancers = composeWithDevTools({ serialize: true });
const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(...middleware))
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
            <Loader />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
