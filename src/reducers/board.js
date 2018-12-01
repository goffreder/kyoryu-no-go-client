import isEmpty from 'lodash/isEmpty';

import { board as constants } from '../constants';

export const defaultState = {
    board: null,
    color: constants.BLACK,
    atari: false,
    suicide: false,
    passed: false,
    gameOver: false,
};

const reducer = {
    INIT_BOARD: (state, { payload }) => {
        return {
            ...state,
            board: Array(payload).fill(Array(payload).fill(constants.EMPTY)),
        };
    },
    PLAY: (state, { payload: { row, col, color } }) => {
        if (state.gameOver) {
            return state;
        }

        if (
            state.board[row] === undefined ||
            state.board[row][col] === undefined
        ) {
            return state;
        }

        if (state.board[row][col] !== constants.EMPTY) {
            return state;
        }

        let newBoard = setBoardCell(state.board, row, col, color || state.color);

        let neighbors = getAdjacentIntersections(state.board, row, col);
        let captured = [];
        let atari = false;

        neighbors.forEach(n => {
            const i = state.board[n[0]][n[1]];

            if (i !== constants.EMPTY && i !== (color || state.color)) {
                const group = getGroup(newBoard, n[0], n[1]);

                if (group.liberties === 0) {
                    captured.push(group);
                }

                if (group.liberties === 1) {
                    atari = true;
                }
            }
        });

        if (isEmpty(captured) && getGroup(newBoard, row, col).liberties === 0) {
            return {
                ...state,
                suicide: true,
            };
        }

        captured.forEach(group => {
            group.stones.forEach(([ row, col ]) => {
                newBoard = setBoardCell(newBoard, row, col, constants.EMPTY);
            })
        });

        const newColor =
            (color || state.color) === constants.BLACK
                ? constants.WHITE
                : constants.BLACK;

        return {
            ...state,
            board: newBoard,
            color: newColor,
            atari,
            suicide: false,
            passed: false,
        };
    },
    PASS: (state, { payload }) => {
        return {
            ...state,
            passed: true,
            color:
                state.color === constants.BLACK
                    ? constants.WHITE
                    : constants.BLACK,
            gameOver: state.passed && true,
        };
    },
};

const setBoardCell = (board, row, col, color) => {
    const newRow = [
        ...board[row].slice(0, col),
        color,
        ...board[row].slice(col + 1, board[row].length),
    ];

    return [
        ...board.slice(0, row),
        newRow,
        ...board.slice(row + 1, board.length),
    ];
};

export const getAdjacentIntersections = (board, i, j) => {
    let neighbors = [];

    if (i > 0) {
        neighbors.push([i - 1, j]);
    }
    if (i < board.length - 1) {
        neighbors.push([i + 1, j]);
    }
    if (j < board[0].length - 1) {
        neighbors.push([i, j + 1]);
    }
    if (j > 0) {
        neighbors.push([i, j - 1]);
    }

    return neighbors;
};

export const getGroup = (board, i, j) => {
    const cellState = board[i][j];

    if (cellState === constants.EMPTY) {
        return {};
    }

    let visited = {};
    let visitedList = [];
    let queue = [[i, j]];
    let liberties = 0;

    while (queue.length) {
        const stone = queue.pop();

        if (visited[stone]) {
            continue;
        }

        const neighbors = getAdjacentIntersections(board, stone[0], stone[1]);

        for (let k = 0; k < neighbors.length; k++) {
            const n = neighbors[k];

            if (board[n[0]][n[1]] === constants.EMPTY) {
                liberties++;
            }
            if (board[n[0]][n[1]] === cellState) {
                queue.push([n[0], n[1]]);
            }
        }

        visited[stone] = true;
        visitedList.push(stone);
    }

    return {
        stones: visitedList,
        liberties
    };
};

export default (state = defaultState, action = {}) => {
    if (typeof reducer[action.type] === 'undefined') {
        return state;
    }

    return reducer[action.type](state, action);
};
