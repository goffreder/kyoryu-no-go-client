import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pass } from '../actions/board';

class PassButton extends Component {
    handleClick = () => {
        this.props.pass();
    };
    render = function() {
        return (
            <input
                id="pass-btn"
                type="button"
                value="Pass"
                onClick={this.handleClick}
            />
        );
    };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    pass: () => dispatch(pass()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PassButton);
