import reducer, * as selectors from '../board';
import * as actions from '../../actions/board';
import { board as constants, msg } from '../../constants';

const { defaultState } = selectors;

describe('board reducer', () => {
    it('should return the initial state', () => {
        expect(reducer()).toEqual(defaultState);
    });

    it('should not end the game if the first player starts with a pass', () => {
        const newState = reducer(defaultState, actions.pass());

        expect(newState.gameOver).toEqual(false);
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

    it('should reset the board', () => {
        const currentState = {
            ...defaultState,
            board: [
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
                [constants.BLACK, constants.WHITE, constants.WHITE],
            ],
            captured: {
                [constants.BLACK]: 5,
                [constants.WHITE]: 2,
            },
            gameOver: true,
        };
        const newState = reducer(currentState, actions.resetBoard());

        expect(newState).toEqual({
            ...defaultState,
            board: [
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
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

        expect(reducer(currentState, actions.play(-1, 2))).toEqual(
            currentState,
        );
        expect(reducer(currentState, actions.play(2, -1))).toEqual(
            currentState,
        );
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
        let newState = reducer(
            {
                ...defaultState,
                color: constants.BLACK,
            },
            actions.pass(),
        );
        expect(newState.color).toEqual(constants.WHITE);

        newState = reducer(
            {
                ...defaultState,
                color: constants.WHITE,
            },
            actions.pass(),
        );
        expect(newState.color).toEqual(constants.BLACK);
    });

    it('should not change the active color when a game over occurs', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            passed: true,
        };
        const newState = reducer(currentState, actions.pass());

        expect(newState.gameOver).toEqual(true);
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
            board: [
                [constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY],
            ],
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
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
                [constants.EMPTY, constants.BLACK, constants.EMPTY],
                [constants.BLACK, constants.WHITE, constants.WHITE],
            ],
        };
        const newState = reducer(currentState, actions.play(1, 2));

        expect(newState.board).toEqual([
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
            [constants.EMPTY, constants.BLACK, constants.BLACK],
            [constants.BLACK, constants.EMPTY, constants.EMPTY],
        ]);
        expect(newState.captured).toEqual({
            [constants.BLACK]: 0,
            [constants.WHITE]: 2,
        });
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

    it('should not set the atari flag for a non-atari play', () => {
        const currentState = {
            ...defaultState,
            color: constants.BLACK,
            board: [
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
                [constants.BLACK, constants.WHITE, constants.EMPTY],
                [constants.EMPTY, constants.EMPTY, constants.EMPTY],
            ],
        };
        const newState = reducer(currentState, actions.play(1, 2));

        expect(newState.atari).toEqual(false);
    });
});

describe('board selectors', () => {
    it('should get the board', () => {
        const board = [
            [constants.EMPTY, constants.WHITE, constants.EMPTY],
            [constants.BLACK, constants.WHITE, constants.EMPTY],
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
        ];

        expect(
            selectors.getBoard({
                ...defaultState,
                board,
            }),
        ).toEqual([
            [constants.EMPTY, constants.WHITE, constants.EMPTY],
            [constants.BLACK, constants.WHITE, constants.EMPTY],
            [constants.EMPTY, constants.EMPTY, constants.EMPTY],
        ]);
    });

    it('should get the captured stones counts', () => {
        expect(
            selectors.getCaptured({
                ...defaultState,
                captured: {
                    [constants.BLACK]: 0,
                    [constants.WHITE]: 1,
                },
            }),
        ).toEqual({
            [constants.BLACK]: 0,
            [constants.WHITE]: 1,
        });
    });

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

    it('should get the active color', () => {
        expect(
            selectors.getActiveColor({
                ...defaultState,
                color: constants.BLACK,
            }),
        ).toEqual(constants.BLACK);
    });

    it('should return the correct message', () => {
        expect(selectors.getBoardMessage(defaultState)).toEqual('');

        expect(
            selectors.getBoardMessage({
                ...defaultState,
                gameOver: true,
            }),
        ).toEqual(msg.GAME_OVER);

        expect(
            selectors.getBoardMessage({
                ...defaultState,
                suicide: true,
            }),
        ).toEqual(msg.SUICIDE);

        expect(
            selectors.getBoardMessage({
                ...defaultState,
                atari: true,
            }),
        ).toEqual(msg.ATARI);
    });
});
