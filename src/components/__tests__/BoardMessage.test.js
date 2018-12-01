import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import reducers, { defaultState } from '../../reducers';
import ConnectedBoardMessage, { BoardMessage } from '../BoardMessage';
import { msg } from '../../constants';

describe('BoardMessage component', () => {
    it('displays the message passed in the `text` prop', () => {
        const { getByText } = render(<BoardMessage text={msg.GAME_OVER} />);

        expect(getByText(msg.GAME_OVER)).toBeInTheDocument();
    });

    it('displays the message passed in the `text` prop with Redux', () => {
        const { getByText } = render(
            <Provider
                store={createStore(reducers, {
                    ...defaultState,
                    board: {
                        ...defaultState.board,
                        gameOver: true,
                    },
                })}
            >
                <ConnectedBoardMessage />
            </Provider>,
        );

        expect(getByText(msg.GAME_OVER)).toBeInTheDocument();
    });
});
