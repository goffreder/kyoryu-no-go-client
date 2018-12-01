import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, oneOf } from 'prop-types';

import { play } from '../actions/board';

import { ui, board } from '../constants';

export class BoardIntersection extends Component {
    static propTypes = {
        row: number.isRequired,
        col: number.isRequired,
        color: oneOf([board.EMPTY, board.BLACK, board.WHITE]),
        play: func.isRequired,
    };

    static defaultProps = {
        color: board.EMPTY,
    };

    handleClick = () => {
        this.props.play(this.props.row, this.props.col);
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

const mapStateToProps = state => ({});

export const mapDispatchToProps = {
    play,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardIntersection);
