import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import reducers, { defaultState } from '../../reducers';
import ConnectedCaptured, { Captured } from '../Captured';
import { board } from '../../constants';

describe('Captured component', () => {
    it('displays the captured stones counters', () => {
        const captured = {
            [board.WHITE]: 0,
            [board.BLACK]: 0,
        };

        expect(
            renderer.create(<Captured captured={captured} />).toJSON(),
        ).toMatchSnapshot();
    });

    it('displays the captured stones counters with Redux', () => {
        expect(
            renderer.create(<Provider store={createStore(reducers, defaultState)}>
                <ConnectedCaptured />
            </Provider>).toJSON(),
        ).toMatchSnapshot();
    });
});
