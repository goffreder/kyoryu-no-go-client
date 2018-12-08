import React, { Component } from 'react';
import { func, number, oneOf, bool } from 'prop-types';
import classNames from 'classnames';

import Stone from './Stone';
import { board } from '../constants';

export default class extends Component {
    static propTypes = {
        row: number.isRequired,
        col: number.isRequired,
        color: oneOf([board.EMPTY, board.BLACK, board.WHITE]),
        play: func,
        width: number,
        isTopEdge: bool,
        isRightEdge: bool,
        isBottomEdge: bool,
        isLeftEdge: bool,
        isStarPoint: bool,
        readonly: bool,
    };

    static defaultProps = {
        color: board.EMPTY,
        width: 100,
        readonly: false,
    };

    handleClick = () => {
        !this.props.readonly &&
            this.props.play &&
            this.props.play(this.props.row, this.props.col);
    };

    render() {
        return (
            <div
                style={{
                    float: 'left',
                    lineHeight: '1',
                    paddingTop: this.props.width + '%',
                    position: 'relative',
                    textAlign: 'center',
                    width: this.props.width + '%',
                }}
                className={classNames(
                    'intersection',
                    this.props.isStarPoint ? 'hoshi' : null,
                )}
                onClick={this.handleClick}
            >
                <div
                    style={{
                        cursor:
                            this.props.color !== board.EMPTY ||
                            this.props.readonly
                                ? 'auto'
                                : 'pointer',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    {this.props.isStarPoint ? (
                        <div
                            style={{
                                background: '#63380E',
                                borderRadius: 9000,
                                height: '20%',
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '20%',
                                minWidth: 4,
                                minHeight: 4,
                            }}
                        />
                    ) : null}
                    <div
                        style={{
                            background: '#63380E',
                            height: '1px',
                            position: 'absolute',
                            top: '50%',
                            right: this.props.isRightEdge ? '50%' : 0,
                            left: this.props.isLeftEdge ? '50%' : 0,
                            transform: 'translateY(-50%)',
                        }}
                    />
                    <div
                        style={{
                            background: '#63380E',
                            position: 'absolute',
                            left: '50%',
                            top: this.props.isTopEdge ? '50%' : 0,
                            bottom: this.props.isBottomEdge ? '50%' : 0,
                            transform: 'translateX(-50%)',
                            width: '1px',
                        }}
                    />
                    {this.props.color !== board.EMPTY ? (
                        <Stone color={this.props.color} />
                    ) : null}
                </div>
            </div>
        );
    }
}
