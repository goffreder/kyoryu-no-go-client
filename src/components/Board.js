import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, oneOf } from 'prop-types';

import { getBoard } from '../reducers/board';
import { ui, board } from '../constants';
import BoardIntersection from './BoardIntersection';

export class Board extends Component {
    static propTypes = {
        board: arrayOf(arrayOf(oneOf([board.EMPTY, board.BLACK, board.WHITE]))),
    };

    static defaultProps = {
        board: [],
    };

    render() {
        if (this.props.board.length === 0) {
            return null;
        }

        const size = this.props.board.length;
        let intersections = [];

        for (let i = 0; i < size; i++)
            for (let j = 0; j < size; j++)
                intersections.push(
                    <BoardIntersection
                        key={`${i}, ${j}`}
                        color={this.props.board[i][j]}
                        row={i}
                        col={j}
                    />,
                );
        const style = {
            width: size * ui.GRID_SIZE,
            height: size * ui.GRID_SIZE,
        };
        return (
            <div style={style} id="board">
                {intersections}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    board: getBoard(state.board),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);
