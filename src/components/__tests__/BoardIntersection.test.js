import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-testing-library';
import reducers, { defaultState } from '../../reducers';
import { play } from '../../actions/board';
import ConnectedBoardIntersection, {
    BoardIntersection,
    mapDispatchToProps,
} from '../BoardIntersection';
import { board } from '../../constants';

describe('BoardIntersection component', () => {
    it('displays an empty intersection', () => {
        const { container } = render(
            <BoardIntersection row={0} col={0} play={() => {}} />,
        );

        expect(container.querySelector('div.intersection')).toBeInTheDocument();
    });

    it('displays a black intersection', () => {
        const { container } = render(
            <BoardIntersection
                row={0}
                col={0}
                play={() => {}}
                color={board.BLACK}
            />,
        );

        expect(
            container.querySelector('div.intersection.black'),
        ).toBeInTheDocument();
    });

    it('displays a white intersection', () => {
        const { container } = render(
            <BoardIntersection
                row={0}
                col={0}
                play={() => {}}
                color={board.WHITE}
            />,
        );

        expect(
            container.querySelector('div.intersection.white'),
        ).toBeInTheDocument();
    });

    it('calls "play" prop on intersection click', () => {
        const play = jest.fn();
        const { container } = render(
            <BoardIntersection row={0} col={0} play={play} />,
        );

        fireEvent.click(container.querySelector('div.intersection'));
        expect(play).toHaveBeenCalled();
    });

    it('displays an empty intersection with Redux', () => {
        const { container } = render(
            <Provider store={createStore(reducers, defaultState)}>
                <ConnectedBoardIntersection row={0} col={0} />
            </Provider>,
        );

        expect(container.querySelector('div.intersection')).toBeInTheDocument();
    });

    it('should use the correct action creators', () => {
        expect(mapDispatchToProps).toEqual({ play });
    });
});