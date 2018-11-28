import React, { Component } from 'react';

import { Board } from '../board';

const GRID_SIZE = 40;

export default class extends Component {
    handleClick = () => {
        this.props.board.play(this.props.row, this.props.col);
    };
    render = function() {
        var style = {
            top: this.props.row * GRID_SIZE,
            left: this.props.col * GRID_SIZE,
        };

        var classes = 'intersection';
        if (this.props.color !== Board.EMPTY)
            classes += this.props.color === Board.BLACK ? ' black' : ' white';

        return (
            <div onClick={this.handleClick} className={classes} style={style} />
        );
    };
}
