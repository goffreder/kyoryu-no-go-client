import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import 'materialize-css';

import { resetBoard } from '../actions/board';

export class ResetButton extends Component {
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
                id="reset-btn"
                onClick={this.handleClick}
            >
                {'Reset'}
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
)(ResetButton);
