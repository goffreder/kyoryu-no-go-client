import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-testing-library';
import reducers, { defaultState } from '../../reducers';
import { quitGame } from '../../actions/board';
import ConnectedQuitGameButton, {
    QuitGameButton,
    mapDispatchToProps,
} from '../QuitGameButton';

describe('QuitGameButton component', () => {
    it('displays a "Quit game" button', () => {
        const { getByText } = render(<QuitGameButton quitGame={() => {}} />);

        expect(getByText('Quit game')).toBeInTheDocument();
    });

    it('calls "quitGame" prop on button click', () => {
        const quitGame = jest.fn();
        const { getByText } = render(<QuitGameButton quitGame={quitGame} />);

        fireEvent.click(getByText('Quit game'));
        expect(quitGame).toHaveBeenCalledTimes(1);
    });

    it('displays a "Quit game" button with Redux', () => {
        const { getByText } = render(
            <Provider store={createStore(reducers, defaultState)}>
                <ConnectedQuitGameButton />
            </Provider>,
        );

        expect(getByText('Quit game')).toBeInTheDocument();
    });

    it('should use the correct action creators', () => {
        expect(mapDispatchToProps).toEqual({ quitGame });
    });
});
