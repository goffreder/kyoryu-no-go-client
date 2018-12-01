import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBoard } from '../reducers/board';
import { ui } from '../constants';
import BoardIntersection from './BoardIntersection';

class Board extends Component {
    render = function() {
        if (this.props.board === null) {
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
    };
}

const mapStateToProps = state => ({
    board: getBoard(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);
