import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-testing-library';
import reducers, { defaultState } from '../../reducers';
import { resetBoard } from '../../actions/board';
import ConnectedResetButton, {
    ResetButton,
    mapDispatchToProps,
} from '../ResetButton';

describe('ResetButton component', () => {
    it('displays a "Reset" button', () => {
        const { getByText } = render(<ResetButton resetBoard={() => {}} />);

        expect(getByText('Reset')).toBeInTheDocument();
    });

    it('calls "resetBoard" prop on button click', () => {
        const resetBoard = jest.fn();
        const { getByText } = render(<ResetButton resetBoard={resetBoard} />);

        fireEvent.click(getByText('Reset'));
        expect(resetBoard).toHaveBeenCalledTimes(1);
    });

    it('displays a "Reset" button with Redux', () => {
        const { getByText } = render(
            <Provider store={createStore(reducers, defaultState)}>
                <ConnectedResetButton />
            </Provider>,
        );

        expect(getByText('Reset')).toBeInTheDocument();
    });

    it('should use the correct action creators', () => {
        expect(mapDispatchToProps).toEqual({ resetBoard });
    });
});
