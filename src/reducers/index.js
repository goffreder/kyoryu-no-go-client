import { combineReducers } from 'redux';

import board, { defaultState as boardState } from './board';

export const defaultState = {
    board: {
        ...boardState,
    },
};

export default combineReducers({
    board,
});
