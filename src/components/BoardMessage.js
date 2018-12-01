import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBoardMessage } from '../reducers/board';

class BoardMessage extends Component {
    render = function() {
        return <div id="alerts">{this.props.text}</div>;
    };
}

const mapStateToProps = state => ({
    text: getBoardMessage(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardMessage);
