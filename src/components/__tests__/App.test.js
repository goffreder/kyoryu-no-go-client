import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import reducers, { defaultState } from '../../reducers';
import { initBoard } from '../../actions/board';
import App, { mapDispatchToProps } from '../App';

describe('App component', () => {
    it('displays the board selectors if the board has not been initialized', () => {
        expect(
            renderer
                .create(
                    <Provider store={createStore(reducers, defaultState)}>
                        <App />
                    </Provider>,
                )
                .toJSON(),
        ).toMatchSnapshot();
    });

    it('displays the board if it has been initialized', () => {
        const currentState = reducers(defaultState, initBoard(9));

        expect(
            renderer
                .create(
                    <Provider store={createStore(reducers, currentState)}>
                        <App />
                    </Provider>,
                )
                .toJSON(),
        ).toMatchSnapshot();
    });

    it('should use the correct action creators', () => {
        expect(mapDispatchToProps).toEqual({ initBoard });
    });
});
