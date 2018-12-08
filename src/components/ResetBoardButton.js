import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { resetBoard } from '../actions/board';

export class ResetBoardButton extends Component {
    static propTypes = {
        resetBoard: func.isRequired,
    };

    handleClick = () => {
        this.props.resetBoard();
    };

    render = function() {
        return (
            <button
                className="waves-effect waves-light btn blue-grey darken-4"
                id="reset-board-btn"
                onClick={this.handleClick}
            >
                {'Reset board'}
            </button>
        );
    };
}

const mapStateToProps = state => ({});

export const mapDispatchToProps = {
    resetBoard,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResetBoardButton);
