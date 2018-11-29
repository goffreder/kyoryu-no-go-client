import reducer, * as board from '../board';
import * as actions from '../../actions/board';
import { board as constants } from '../../constants';

const { defaultState } = board;

describe('board reducer', () => {
    it('should return the initial state', () => {
        expect(reducer()).toEqual(defaultState);
    });

    it('should init the board', () => {
        const size = 2;
        const newState = reducer(defaultState, actions.initBoard(size));

        expect(newState).toEqual({
            ...defaultState,
            board: [[0, 0], [0, 0]]
        });
    });

    it('should make a valid play for the current active color', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        };
        const newState = reducer(currentState, actions.play(2, 1));

        expect(newState.board).toEqual([[0, 0, 0], [0, 0, 0], [0, constants.BLACK, 0]]);
    });

    it('should make a valid play for a specified color', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [[0, 0], [0, 0]],
        };
        const color = constants.WHITE;
        const newState = reducer(currentState, actions.play(0, 0, color));

        expect(newState.board).toEqual([[color, 0], [0, 0]]);
    });

    it('should not make plays outside of the board', () => {
        const currentState = {
            ...defaultState,
            board: [[0, 0], [0, 0]],
        };
        const newState = reducer(currentState, actions.play(-1, 2));

        expect(newState).toEqual(currentState);
    });

    it('should change the active color after a valid play', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [[0, 0], [0, 0]],
        };
        const newState = reducer(currentState, actions.play(0, 0));

        expect(newState.color).toEqual(constants.WHITE);
    });

    it('should change the active color after a valid play for a specified color', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [[0, 0], [0, 0]],
        };
        const newState = reducer(currentState, actions.play(0, 0, constants.WHITE));

        expect(newState.color).toEqual(constants.BLACK);
    });

    xit('should not change the active color after a forbidden play', () => {
        expect(false).toBe(true);
    });

    xit('should prevent a forbidden play', () => {
        expect(false).toBe(true);
    });

    it('should set the atari flag', () => {
        expect(reducer(defaultState, actions.setAtari(true))).toEqual({
            ...defaultState,
            atari: true
        });
    });

    it('should set the suicide flag', () => {
        expect(reducer(defaultState, actions.setSuicide(true))).toEqual({
            ...defaultState,
            suicide: true
        });
    });

    it('should set the passed flag', () => {
        const newState = reducer(defaultState, actions.pass());

        expect(newState.passed).toEqual(true);
    });

    it('should change the active color after a pass', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
        };
        const newState = reducer(currentState, actions.pass());

        expect(newState.color).toEqual(constants.WHITE);
    });

    it('should unset the passed flag after a valid play', () => {
        const currentState = {
            ...defaultState,
            board: [[0, 0], [0, 0]],
            passed: true,
        };
        const newState = reducer(currentState, actions.play(0, 0));

        expect(newState.passed).toBe(false);
    });

    xit('should not unset the passed flag after a forbidden play', () => {
        expect(false).toBe(true);
    });

    it('should set the game over flag when a pass occurs when the passed flag is true', () => {
        const currentState = {
            ...defaultState,
            passed: true,
        };
        const newState = reducer(currentState, actions.pass());

        expect(newState.gameOver).toEqual(true);
    });

    it('should prevent a play when the game is over', () => {
        const currentState = {
            ...defaultState,
            gameOver: true,
        };
        const newState = reducer(currentState, actions.play(0, 0));

        expect(newState).toEqual(currentState);
    });
});
