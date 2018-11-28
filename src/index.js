import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import * as serviceWorker from './serviceWorker';

import { Board } from './board';
import App from './components/App';

const board = new Board(9);

ReactDOM.render(
    <App board={board} />,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
