import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oneOf } from 'prop-types';

import Stone from './Stone';
import { getActiveColor } from '../reducers/board';
import { board as constants } from '../constants';

export class ActiveColor extends Component {
    static propTypes = {
        color: oneOf([constants.BLACK, constants.WHITE]).isRequired,
    };

    render() {
        const stoneContainerStyle = {
            position: 'relative',
            width: 36,
            height: 36,
        };

        return (
            <div id="active-color" style={stoneContainerStyle}>
                <Stone color={this.props.color} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    color: getActiveColor(state.board),
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActiveColor);
