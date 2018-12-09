import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers, { defaultState } from '../../reducers';

import GameFooter from '../GameFooter';

describe('GameFooter component', () => {
    it('displays the game footer', () => {
        expect(
            renderer
                .create(
                    <Provider store={createStore(reducers, defaultState)}>
                        <GameFooter />
                    </Provider>,
                )
                .toJSON(),
        ).toMatchSnapshot();
    });
});
