import { createAction } from 'redux-actions';

export const initBoard = createAction('INIT_BOARD', size => size);
export const play = createAction('PLAY', (row, col, color) => ({
    row,
    col,
    color,
}));
export const setAtari = createAction('SET_ATARI', atari => atari);
export const setSuicide = createAction('SET_SUICIDE', suicide => suicide);
export const pass = createAction('PASS');
export const resetBoard = createAction('RESET_BOARD');
export const quitGame = createAction('QUIT_GAME');
