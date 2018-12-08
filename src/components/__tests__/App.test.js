import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import reducers, { defaultState } from '../../reducers';
import { initBoard } from '../../actions/board';
import App, { mapDispatchToProps } from '../App';

describe('App component', () => {
    it('displays the application with Redux', () => {
        const { container } = render(
            <Provider store={createStore(reducers, defaultState)}>
                <App />
            </Provider>,
        );

        expect(container.querySelector('#board')).toBeInTheDocument();
        expect(container.querySelector('#pass-btn')).toBeInTheDocument();
        expect(container.querySelector('#reset-btn')).toBeInTheDocument();
        expect(container.querySelector('#alerts')).toBeInTheDocument();
    });

    it('should use the correct action creators', () => {
        expect(mapDispatchToProps).toEqual({ initBoard });
    });
});
