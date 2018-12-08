import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oneOf } from 'prop-types';

import { getBoardMessage } from '../reducers/board';
import { msg } from '../constants';

export class BoardMessage extends Component {
    static propTypes = {
        text: oneOf(['', msg.GAME_OVER, msg.SUICIDE, msg.ATARI]).isRequired,
    };

    render = function() {
        return (
            <div id="alerts" style={{ width: 100, textAlign: 'right' }}>
                {this.props.text}
            </div>
        );
    };
}

const mapStateToProps = state => ({
    text: getBoardMessage(state.board),
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardMessage);
