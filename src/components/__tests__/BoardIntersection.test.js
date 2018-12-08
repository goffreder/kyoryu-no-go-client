import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import renderer from 'react-test-renderer';
import BoardIntersection from '../BoardIntersection';
import { board } from '../../constants';

describe('BoardIntersection component', () => {
    it('displays an empty intersection', () => {
        const { container } = render(
            <BoardIntersection row={0} col={0} play={() => {}} />,
        );

        expect(container.querySelector('div.intersection')).toBeInTheDocument();
    });

    it('displays a star point intersection', () => {
        expect(
            renderer
                .create(
                    <BoardIntersection
                        row={0}
                        col={0}
                        play={() => {}}
                        isStarPoint
                    />,
                )
                .toJSON(),
        ).toMatchSnapshot();
    });

    it('displays edges intersections', () => {
        expect(
            renderer
                .create(
                    <BoardIntersection
                        row={0}
                        col={0}
                        play={() => {}}
                        isTopEdge
                    />,
                )
                .toJSON(),
        ).toMatchSnapshot();
        expect(
            renderer
                .create(
                    <BoardIntersection
                        row={0}
                        col={0}
                        play={() => {}}
                        isLeftEdge
                    />,
                )
                .toJSON(),
        ).toMatchSnapshot();
        expect(
            renderer
                .create(
                    <BoardIntersection
                        row={0}
                        col={0}
                        play={() => {}}
                        isRightEdge
                    />,
                )
                .toJSON(),
        ).toMatchSnapshot();
        expect(
            renderer
                .create(
                    <BoardIntersection
                        row={0}
                        col={0}
                        play={() => {}}
                        isBottomEdge
                    />,
                )
                .toJSON(),
        ).toMatchSnapshot();
    });

    it('displays a black stone on an intersection', () => {
        const { container } = render(
            <BoardIntersection
                row={0}
                col={0}
                play={() => {}}
                color={board.BLACK}
            />,
        );

        expect(
            container.querySelector('.intersection .stone.stone-black'),
        ).toBeInTheDocument();
    });

    it('displays a white stone on an intersection', () => {
        const { container } = render(
            <BoardIntersection
                row={0}
                col={0}
                play={() => {}}
                color={board.WHITE}
            />,
        );

        expect(
            container.querySelector('.intersection .stone.stone-white'),
        ).toBeInTheDocument();
    });

    it('calls "play" prop on intersection click', () => {
        const play = jest.fn();
        const { container } = render(
            <BoardIntersection row={0} col={0} play={play} />,
        );

        fireEvent.click(container.querySelector('.intersection'));
        expect(play).toHaveBeenCalledTimes(1);
    });

    it('should not call "play" prop on readonly intersection click', () => {
        const play = jest.fn();
        const { container } = render(
            <BoardIntersection row={0} col={0} play={play} readonly />,
        );

        fireEvent.click(container.querySelector('.intersection'));
        expect(play).not.toHaveBeenCalled();
    });
});
