import React, { Component } from 'react';
import $ from 'jquery';

import BoardIntersection from './BoardIntersection';

import { ui } from '../constants';

export default class extends Component {
    constructor(props) {
        super(props);

        var self = this;

        $(props.board).on('update', function(e) {
            self.setState({ board: props.board });
        });

        this.state = {
            board: props.board,
        };
    }

    render = function() {
        var intersections = [];
        for (var i = 0; i < this.props.board.size; i++)
            for (var j = 0; j < this.props.board.size; j++)
                intersections.push(
                    <BoardIntersection
                        key={`${i}, ${j}`}
                        board={this.props.board}
                        color={this.props.board.board[i][j]}
                        row={i}
                        col={j}
                    />,
                );
        var style = {
            width: this.props.board.size * ui.GRID_SIZE,
            height: this.props.board.size * ui.GRID_SIZE,
        };
        return (
            <div style={style} id="board">
                {intersections}
            </div>
        );
    };
}
