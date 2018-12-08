import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-testing-library';

import BoardSelector from '../BoardSelector';

describe('BoardSelector component', () => {
    it('displays a board selector', () => {
        expect(
            renderer
                .create(<BoardSelector size={9} initBoard={() => {}} />)
                .toJSON(),
        ).toMatchSnapshot();
    });

    it('calls "initBoard" prop on button click', () => {
        const initBoard = jest.fn();
        const { getByText } = render(
            <BoardSelector size={9} initBoard={initBoard} />,
        );

        fireEvent.click(getByText('Init 9x9 board'));
        expect(initBoard).toHaveBeenCalledTimes(1);
    });
});
