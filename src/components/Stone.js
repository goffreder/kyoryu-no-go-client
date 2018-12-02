import React, { Component } from 'react';
import { oneOf } from 'prop-types';
import classNames from 'classnames';
import Dimensions from 'react-dimensions';

import { board as constants } from '../constants';

class Stone extends Component {
    static propTypes = {
        color: oneOf([constants.BLACK, constants.WHITE]).isRequired,
    };

    render() {
        const w = this.props.containerWidth;
        return (
            <div
                style={{
                    background:
                        this.props.color === constants.BLACK
                            ? '#101015'
                            : '#EEEEF0',
                    borderRadius: 9001,
                    boxShadow:
                        (this.props.color === constants.BLACK
                            ? 'inset 0 ' +
                              w / 6 +
                              'px ' +
                              w / 3 +
                              'px 0 rgba(255,255,255,.2),'
                            : 'inset 0 ' +
                              -w / 6 +
                              'px ' +
                              w / 3 +
                              'px 0 rgba(0,0,0,.16),') +
                        '0 ' +
                        w / 12 +
                        'px ' +
                        w / 6 +
                        'px 0 rgba(0,0,0,.16),' +
                        '0 ' +
                        w / 12 +
                        'px ' +
                        w / 4 +
                        'px 0 rgba(0,0,0,.12)',
                    position: 'absolute',
                    top: '5%',
                    right: '5%',
                    bottom: '5%',
                    left: '5%',
                }}
            />
        );
    }
}

export default Dimensions()(Stone);
