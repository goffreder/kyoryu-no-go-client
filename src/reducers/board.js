import { board } from '../constants';

export const defaultState = {
    board: null,
    captured: null,
    color: board.BLACK,
    atari: false,
    suicide: false,
    passed: false,
    gameOver: false,
};

const reducer = {
    INIT_BOARD: (state, { payload }) => {
        return {
            ...state,
            board: Array(payload).fill(Array(payload).fill(board.EMPTY)),
        };
    },
    PLAY: (state, { payload: { row, col, color } }) => {
        if (state.gameOver) {
            return state;
        }

        if (state.board[row] === undefined || state.board[row][col] === undefined) {
            return state;
        }

        const newRow = [
            ...state.board[row].slice(0, col),
            color || state.color,
            ...state.board[row].slice(col, state.board[row].length - 1)
        ];

        const newBoard = [
            ...state.board.slice(0, row),
            newRow,
            ...state.board.slice(row, state.board.length - 1)
        ];

        const newColor = (color || state.color) === board.BLACK ? board.WHITE : board.BLACK;

        return {
            ...state,
            board: newBoard,
            color: newColor,
            passed: false,
        };
    },
    SET_ATARI: (state, { payload }) => {
        return {
            ...state,
            atari: payload,
        };
    },
    SET_SUICIDE: (state, { payload }) => {
        return {
            ...state,
            suicide: payload,
        };
    },
    PASS: (state, { payload }) => {
        return {
            ...state,
            passed: true,
            color: state.color === board.BLACK ? board.WHITE : board.BLACK,
            gameOver: state.passed && true,
        };
    }
};

export default (state = defaultState, action = {}) => {
    if (typeof reducer[action.type] === 'undefined') {
        return state;
    }

    return reducer[action.type](state, action);
};
