import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { play } from '../actions/board';

import { ui, board } from '../constants';

class BoardIntersection extends Component {
    static propTypes = {
        play: func.isRequired,
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

const mapDispatchToProps = dispatch => ({
    play: (row, col) => dispatch(play(row, col)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardIntersection);
