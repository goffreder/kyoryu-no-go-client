import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import 'materialize-css';

import { pass } from '../actions/board';

export class PassButton extends Component {
    static propTypes = {
        pass: func.isRequired,
    };

    handleClick = () => {
        this.props.pass();
    };

    render = function() {
        return (
            <button
                className="waves-effect waves-light btn blue-grey darken-4"
                id="pass-btn"
                onClick={this.handleClick}
            >
                {'Pass'}
            </button>
        );
    };
}

const mapStateToProps = state => ({});

export const mapDispatchToProps = {
    pass,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PassButton);
