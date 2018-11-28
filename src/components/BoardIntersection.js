import React, { Component } from 'react';

import { ui, board } from '../constants';

export default class extends Component {
    handleClick = () => {
        this.props.board.play(this.props.row, this.props.col);
    };
    render = function() {
        var style = {
            top: this.props.row * ui.GRID_SIZE,
            left: this.props.col * ui.GRID_SIZE,
        };

        var classes = 'intersection';
        if (this.props.color !== board.EMPTY)
            classes += this.props.color === board.BLACK ? ' black' : ' white';

        return (
            <div onClick={this.handleClick} className={classes} style={style} />
        );
    };
}
