import React, { Component } from 'react';
import { oneOf, bool } from 'prop-types';
import classNames from 'classnames';
// import Dimensions from 'react-dimensions';

import { board as constants } from '../constants';

class Stone extends Component {
    static propTypes = {
        color: oneOf([constants.BLACK, constants.WHITE]).isRequired,
        isLastMove: bool,
    };

    static defaultProps = {
        isLastMove: false,
    };

    render() {
        const w = this.props.containerWidth || 20;

        const boxShadow = [
            this.props.color === constants.BLACK
                ? `inset 0 ${w / 6}px ${w / 3}px 0 rgba(255, 255, 255, .2)`
                : `inset 0 ${-w / 6}px ${w / 3}px 0 rgba(0, 0, 0, .16)`,
            `0 ${w / 12}px ${w / 6}px 0 rgba(0, 0, 0, .16)`,
            `0 ${w / 12}px ${w / 4}px 0 rgba(0, 0, 0, .12)`,
        ];

        return (
            <div
                className={classNames(
                    'stone',
                    this.props.color === constants.BLACK
                        ? 'stone-black'
                        : 'stone-white',
                )}
                style={{
                    background:
                        this.props.color === constants.BLACK
                            ? '#101015'
                            : '#EEEEF0',
                    borderRadius: 9001,
                    boxShadow,
                    position: 'absolute',
                    top: '5%',
                    right: '5%',
                    bottom: '5%',
                    left: '5%',
                }}
            >
                {this.props.isLastMove ? (
                    <div
                        style={{
                            width: '40%',
                            height: '40%',
                            borderRadius: '100%',
                            top: '30%',
                            left: '30%',
                            position: 'relative',
                            border:
                                '0.2em solid ' +
                                (this.props.color === constants.BLACK
                                    ? '#EEEEF0'
                                    : '#101015'),
                        }}
                    />
                ) : null}
            </div>
        );
    }
}

// export default Dimensions()(Stone);
export default Stone;
