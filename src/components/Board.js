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
        const size = this.props.board.length;

        if (size === 0) {
            return null;
        }

        const width = 100 / size;

        return (
            <div className="row">
                <div
                    className="card col s12 m8 push-m2 l6 push-l3"
                    style={{
                        background: '#DCB771',
                        padding: 12,
                    }}
                >
                    {this.props.board.map((row, i) => (
                        <div
                            className="clearfix"
                            key={i}
                            style={{ height: `${size}%`, position: 'relative' }}
                        >
                            {row.map((state, j) => (
                                <BoardIntersection
                                    key={`${i}, ${j}`}
                                    color={state}
                                    row={i}
                                    col={j}
                                    width={width}
                                    isTopEdge={i === 0}
                                    isRightEdge={j === size - 1}
                                    isBottomEdge={i === size - 1}
                                    isLeftEdge={j === 0}
                                    isStarPoint={
                                        [3, size - 4, (size - 1) / 2].indexOf(
                                            i,
                                        ) >= 0 &&
                                        [3, size - 4, (size - 1) / 2].indexOf(
                                            j,
                                        ) >= 0
                                    }
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );

        // const size = this.props.board.length;
        // let intersections = [];
        //
        // for (let i = 0; i < size; i++)
        //     for (let j = 0; j < size; j++)
        //         intersections.push(
        //             <BoardIntersection
        //                 key={`${i}, ${j}`}
        //                 color={this.props.board[i][j]}
        //                 row={i}
        //                 col={j}
        //             />,
        //         );
        // const style = {
        //     width: size * ui.GRID_SIZE,
        //     height: size * ui.GRID_SIZE,
        // };
        // return (
        //     <div style={style} id="board">
        //         {intersections}
        //     </div>
        // );
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
