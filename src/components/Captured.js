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
        const counterContainerStyle = {
            display: 'flex',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'center',
        };
        const stoneContainerStyle = {
            marginRight: 5,
            position: 'relative',
            width: 36,
            height: 36,
        };

        return (
            <div id="captured-stones">
                <div style={counterContainerStyle}>
                    <div style={stoneContainerStyle}>
                        <Stone color={constants.WHITE} />
                    </div>
                    <span>{this.props.captured[constants.WHITE]}</span>
                </div>
                <div style={counterContainerStyle}>
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
