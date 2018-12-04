import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import reducers, { defaultState } from '../../reducers';
import ConnectedBoard, { Board } from '../Board';
import { board as constants } from '../../constants';

describe('Board component', () => {
    it('should not display an empty board', () => {
        const { container } = render(<Board />);

        expect(container.querySelector('#board')).not.toBeInTheDocument();
    });

    it('should display the board with Redux', () => {
        const board = [
            [constants.EMPTY, constants.BLACK, constants.EMPTY],
            [constants.BLACK, constants.WHITE, constants.EMPTY],
            [constants.EMPTY, constants.BLACK, constants.EMPTY],
        ];

        const { container } = render(
            <Provider
                store={createStore(reducers, {
                    ...defaultState,
                    board: {
                        ...defaultState.board,
                        board,
                    },
                })}
            >
                <ConnectedBoard />
            </Provider>,
        );
        const boardNode = container.querySelector('#board');

        expect(boardNode).toBeInTheDocument();
        expect(boardNode.querySelectorAll('.intersection').length).toEqual(9);
        expect(
            boardNode.querySelectorAll('.intersection .stone.stone-black')
                .length,
        ).toEqual(3);
        expect(
            boardNode.querySelectorAll('.intersection .stone.stone-white')
                .length,
        ).toEqual(1);
    });

    it('should display 4 hoshi for a 9x9 goban', () => {
        const board = Array(9).fill(Array(9).fill(constants.EMPTY));

        const { container } = render(
            <Provider
                store={createStore(reducers, {
                    ...defaultState,
                    board: {
                        ...defaultState.board,
                        board,
                    },
                })}
            >
                <ConnectedBoard />
            </Provider>,
        );
        const boardNode = container.querySelector('#board');

        expect(boardNode.querySelectorAll('.intersection.hoshi').length).toEqual(4);
    });

    it('should display 9 hoshi for a 19x19 goban', () => {
        const board = Array(19).fill(Array(19).fill(constants.EMPTY));

        const { container } = render(
            <Provider
                store={createStore(reducers, {
                    ...defaultState,
                    board: {
                        ...defaultState.board,
                        board,
                    },
                })}
            >
                <ConnectedBoard />
            </Provider>,
        );
        const boardNode = container.querySelector('#board');

        expect(boardNode.querySelectorAll('.intersection.hoshi').length).toEqual(9);
    });
});
