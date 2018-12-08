import React from 'react';
import renderer from 'react-test-renderer';

import Stone from '../Stone';
import { board } from '../../constants';

describe('Stone component', () => {
    it('should display a white stone', () => {
        expect(
            renderer.create(<Stone color={board.WHITE} />).toJSON(),
        ).toMatchSnapshot();
    });

    it('should display a black stone', () => {
        expect(
            renderer.create(<Stone color={board.BLACK} />).toJSON(),
        ).toMatchSnapshot();
    });
});
