import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { render, fireEvent } from 'react-testing-library';
import reducers, { defaultState } from '../../reducers';
import { pass } from '../../actions/board';
import ConnectedPassButton, {
    PassButton,
} from '../PassButton';

describe('PassButton component', () => {
    it('displays a "Pass" button', () => {
        const { getByText } = render(<PassButton pass={() => {}} />);

        expect(getByText('Pass')).toBeInTheDocument();
    });

    it('calls "pass" prop on button click', () => {
        const pass = jest.fn();
        const { getByText } = render(<PassButton pass={pass} />);

        fireEvent.click(getByText('Pass'));
        expect(pass).toHaveBeenCalled();
    });

    it('displays a "Pass" button with Redux', () => {
        const { getByText } = render(
            <Provider store={createStore(reducers, defaultState)}>
                <ConnectedPassButton />
            </Provider>,
        );

        expect(getByText('Pass')).toBeInTheDocument();
    });

    it('calls "pass" prop on button click with Redux', () => {
        const mockPass = jest.fn(pass);
        const ConnectedPassButton2 = connect(
            state => ({}),
            { pass: mockPass },
        )(PassButton);
        const { getByText } = render(
            <Provider store={createStore(reducers, defaultState)}>
                <ConnectedPassButton2 />
            </Provider>,
        );

        fireEvent.click(getByText('Pass'));
        expect(mockPass).toHaveBeenCalled();
    });
});
