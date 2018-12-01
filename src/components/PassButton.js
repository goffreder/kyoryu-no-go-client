import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

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
            <button id="pass-btn" onClick={this.handleClick}>
                {'Pass'}
            </button>
        );
    };
}

export const mapDispatchToProps = {
    pass
};

export default connect(
    state => ({}),
    mapDispatchToProps,
)(PassButton);
