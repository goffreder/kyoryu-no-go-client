import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers, { defaultState } from '../../reducers';

import ConnectedActiveColor, { ActiveColor } from '../ActiveColor';
import { board } from '../../constants';

describe('ActiveColor component', () => {
    it('displays white as the active color', () => {
        expect(
            renderer.create(<ActiveColor color={board.WHITE} />).toJSON(),
        ).toMatchSnapshot();
    });

    it('display black as the active color', () => {
        expect(
            renderer.create(<ActiveColor color={board.BLACK} />).toJSON(),
        ).toMatchSnapshot();
    });

    it('displays the active color with Redux', () => {
        expect(
            renderer
                .create(
                    <Provider store={createStore(reducers, defaultState)}>
                        <ConnectedActiveColor />
                    </Provider>,
                )
                .toJSON(),
        ).toMatchSnapshot();
    });
});
