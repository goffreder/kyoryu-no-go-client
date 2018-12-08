import React from 'react';
import renderer from 'react-test-renderer';

import Stone from '../Stone';
import { board } from '../../constants';

describe('Stone component', () => {
    it('displays a white stone', () => {
        expect(
            renderer.create(<Stone color={board.WHITE} />).toJSON(),
        ).toMatchSnapshot();
    });

    it('displays a black stone', () => {
        expect(
            renderer.create(<Stone color={board.BLACK} />).toJSON(),
        ).toMatchSnapshot();
    });
});
