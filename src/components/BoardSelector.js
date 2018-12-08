import React, { Component } from 'react';
import { number, func } from 'prop-types';

import { Board } from './Board';
import { board as constants } from '../constants';

export default class extends Component {
    static propTypes = {
        size: number.isRequired,
        initBoard: func.isRequired,
    };

    generateBoard = () => {
        return Array(this.props.size).fill(
            Array(this.props.size).fill(constants.EMPTY),
        );
    };

    handleClick = () => {
        this.props.initBoard(this.props.size);
    };

    render() {
        return (
            <div className="col s12 m4">
                <div className="card blue-grey darken-1">
                    <div className="card-content">
                        <Board board={this.generateBoard()} readonly />
                    </div>
                    <div className="card-action center-align">
                        <button
                            className="waves-effect waves-light btn blue-grey btn-large darken-4"
                            onClick={this.handleClick}
                        >{`${this.props.size}x${
                            this.props.size
                        } board`}</button>
                    </div>
                </div>
            </div>
        );
    }
}
