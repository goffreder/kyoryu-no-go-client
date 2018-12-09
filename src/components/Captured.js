import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, number } from 'prop-types';

import Stone from './Stone';
import { getCaptured } from '../reducers/board';
import { board as constants } from '../constants';

export class Captured extends Component {
    static propTypes = {
        captured: shape({
            [constants.BLACK]: number.isRequired,
            [constants.WHITE]: number.isRequired,
        }).isRequired,
    };

    render() {
        const stoneContainerStyle = {
            position: 'relative',
            width: 36,
            height: 36,
        };

        return (
            <div id="captured-stones">
                <div className="captured-wrapper">
                    <div style={stoneContainerStyle}>
                        <Stone color={constants.WHITE} />
                    </div>
                    <span>{this.props.captured[constants.WHITE]}</span>
                </div>
                <div className="captured-wrapper">
                    <div style={stoneContainerStyle}>
                        <Stone color={constants.BLACK} />
                    </div>
                    <span>{this.props.captured[constants.BLACK]}</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    captured: getCaptured(state.board),
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Captured);
