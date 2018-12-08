import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-testing-library';
import reducers, { defaultState } from '../../reducers';
import { resetBoard } from '../../actions/board';
import ConnectedResetBoardButton, {
    ResetBoardButton,
    mapDispatchToProps,
} from '../ResetBoardButton';

describe('ResetBoardButton component', () => {
    it('displays a "Reset board" button', () => {
        const { getByText } = render(
            <ResetBoardButton resetBoard={() => {}} />,
        );

        expect(getByText('Reset board')).toBeInTheDocument();
    });

    it('calls "resetBoard" prop on button click', () => {
        const resetBoard = jest.fn();
        const { getByText } = render(
            <ResetBoardButton resetBoard={resetBoard} />,
        );

        fireEvent.click(getByText('Reset board'));
        expect(resetBoard).toHaveBeenCalledTimes(1);
    });

    it('displays a "Reset board" button with Redux', () => {
        const { getByText } = render(
            <Provider store={createStore(reducers, defaultState)}>
                <ConnectedResetBoardButton />
            </Provider>,
        );

        expect(getByText('Reset board')).toBeInTheDocument();
    });

    it('should use the correct action creators', () => {
        expect(mapDispatchToProps).toEqual({ resetBoard });
    });
});
