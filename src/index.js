import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

import { Board } from './board';
import App from './components/App';

import reducers from './reducers';

const board = new Board(9);

const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App board={board} />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
