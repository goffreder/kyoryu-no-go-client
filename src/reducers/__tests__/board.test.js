import reducer, * as selectors from '../board';
import * as actions from '../../actions/board';
import { board as constants } from '../../constants';

const { defaultState } = selectors;

describe('board reducer', () => {
    it('should return the initial state', () => {
        expect(reducer()).toEqual(defaultState);
    });

    it('should init the board', () => {
        const size = 2;
        const newState = reducer(defaultState, actions.initBoard(size));

        expect(newState).toEqual({
            ...defaultState,
            board: [
                [constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
        });
    });

    it('should make a valid play for the current active color', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY, constants.BLACK],
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(1, 1));

        expect(newState.board).toEqual([
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
            [constants.EMPTY, constants.BLACK, constants.BLACK],
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
        ]);
    });

    it('should make a valid play for a specified color', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [
                [constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
        };
        const color = constants.WHITE;
        const newState = reducer(currentState, actions.play(0, 0, color));

        expect(newState.board).toEqual([
            [color, constants.EMPTY],
            [constants.EMPTY, constants.EMPTY],
        ]);
    });

    it('should not make plays on non-empty intersections', () => {
        const currentState = {
            ...defaultState,
            board: [
                [constants.WHITE, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
        };
        const newState = reducer(
            currentState,
            actions.play(0, 0, constants.BLACK),
        );

        expect(newState).toEqual(currentState);
    });

    it('should not make plays outside of the board', () => {
        const currentState = {
            ...defaultState,
            board: [
                [constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(-1, 2));

        expect(newState).toEqual(currentState);
    });

    it('should change the active color after a valid play', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [
                [constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(0, 0));

        expect(newState.color).toEqual(constants.WHITE);
    });

    it('should reset the suicide flag after a valid play', () => {
        const currentState = {
            ...defaultState,
            suicide: true,
            board: [
                [constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(0, 0));

        expect(newState.suicide).toEqual(false);
    });

    it('should change the active color after a valid play for a specified color', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [
                [constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
        };
        const newState = reducer(
            currentState,
            actions.play(0, 0, constants.WHITE),
        );

        expect(newState.color).toEqual(constants.BLACK);
    });

    it('should only set the suicide flag for a forbidden play', () => {
        const currentState = {
            ...defaultState,
            color: constants.WHITE,
            suicide: false,
            board: [
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
                [constants.BLACK, constants.EMPTY, constants.BLACK],
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(1, 1));

        expect(newState).toEqual({
            ...currentState,
            suicide: true,
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

        let newState = reducer(currentState, actions.pass());
        expect(newState.color).toEqual(constants.WHITE);

        newState = reducer(newState, actions.pass());
        expect(newState.color).toEqual(constants.BLACK);
    });

    it('should unset the passed flag after a valid play', () => {
        const currentState = {
            ...defaultState,
            board: [
                [constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
            passed: true,
        };
        const newState = reducer(currentState, actions.play(0, 0));

        expect(newState.passed).toBe(false);
    });

    it('should not unset the passed flag after a forbidden play', () => {
        const currentState = {
            ...defaultState,
            color: constants.WHITE,
            passed: true,
            board: [
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
                [constants.BLACK, constants.EMPTY, constants.BLACK],
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(1, 1));

        expect(newState.passed).toEqual(true);
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

    it('should capture stones', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
                [constants.BLACK, constants.WHITE, constants.EMPTY],
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(1, 2));

        expect(newState.board).toEqual([
            [constants.EMPTY, constants.BLACK, constants.EMPTY],
            [constants.BLACK, constants.EMPTY, constants.BLACK],
            [constants.EMPTY, constants.BLACK, constants.EMPTY],
        ]);
    });

    it('should set the atari flag', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
                [constants.BLACK, constants.WHITE, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(1, 2));

        expect(newState.atari).toEqual(true);
    });
});

describe('board selectors', () => {
    it('should get the adjacent intersections for a given cell', () => {
        const board = [
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
        ];

        expect(selectors.getAdjacentIntersections(board, 1, 1))
            .toEqual(expect.arrayContaining([[0, 1], [2, 1], [1, 2], [1, 0]]))
            .toHaveLength(4);
        expect(selectors.getAdjacentIntersections(board, 0, 1))
            .toEqual(expect.arrayContaining([[0, 0], [1, 1], [0, 2]]))
            .toHaveLength(3);
        expect(selectors.getAdjacentIntersections(board, 0, 0))
            .toEqual(expect.arrayContaining([[0, 1], [1, 0]]))
            .toHaveLength(2);
        expect(selectors.getAdjacentIntersections(board, 2, 2))
            .toEqual(expect.arrayContaining([[2, 1], [1, 2]]))
            .toHaveLength(2);
    });

    it('should return an empty object when getting the group for an empty cell', () => {
        const board = [
            [constants.EMPTY, constants.EMPTY],
            [constants.EMPTY, constants.EMPTY],
        ];
        const group = selectors.getGroup(board, 1, 1);

        expect(group).toEqual({});
    });

    it('should return the group of stones for a given non-empty cell', () => {
        const board = [
            [constants.EMPTY, constants.WHITE, constants.EMPTY],
            [constants.BLACK, constants.WHITE, constants.EMPTY],
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
        ];
        let group = selectors.getGroup(board, 1, 1);

        expect(group.stones)
            .toEqual(expect.arrayContaining([[0, 1], [1, 1]]))
            .toHaveLength(2);
        expect(group.liberties).toEqual(4);

        group = selectors.getGroup(board, 1, 0);

        expect(group.stones)
            .toEqual(expect.arrayContaining([[1, 0]]))
            .toHaveLength(1);
        expect(group.liberties).toEqual(2);
    });
});
