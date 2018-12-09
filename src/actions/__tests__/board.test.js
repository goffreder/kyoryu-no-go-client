import * as actions from '../board';
import { board } from '../../constants';

describe('board action creators', () => {
    it('should create an action to init the board', () => {
        const size = 9;

        expect(actions.initBoard(size)).toEqual({
            type: 'INIT_BOARD',
            payload: size,
        });
    });

    it('should create an action to reset the board', () => {
        expect(actions.resetBoard()).toEqual({
            type: 'RESET_BOARD',
        });
    });

    it('should create an action to make a play for the current active color', () => {
        const row = 0,
            col = 0;

        expect(actions.play(row, col)).toEqual({
            type: 'PLAY',
            payload: {
                row,
                col,
            },
        });
    });

    it('should create an action to make a play for a specified color', () => {
        const row = 0,
            col = 0,
            color = board.BLACK;

        expect(actions.play(row, col, color)).toEqual({
            type: 'PLAY',
            payload: {
                row,
                col,
                color,
            },
        });
    });

    it('should create an action to set the atari flag', () => {
        expect(actions.setAtari(true)).toEqual({
            type: 'SET_ATARI',
            payload: true,
        });
    });

    it('should create an action to set the suicide flag', () => {
        expect(actions.setSuicide(true)).toEqual({
            type: 'SET_SUICIDE',
            payload: true,
        });
    });

    it('should create an action to pass the play', () => {
        expect(actions.pass()).toEqual({
            type: 'PASS',
        });
    });

    it('should create an action to quit the game', () => {
        expect(actions.quitGame()).toEqual({
            type: 'QUIT_GAME',
        });
    });
});
