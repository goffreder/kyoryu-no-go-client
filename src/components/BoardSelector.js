import React, { Component } from 'react';
import { number, func } from 'prop-types';

export default class extends Component {
    static propTypes = {
        size: number.isRequired,
        initBoard: func.isRequired,
    };

    handleClick = () => {
        this.props.initBoard(this.props.size);
    };

    render() {
        return (
            <div className="col s12 m4">
                <div className="card blue-grey darken-1">
                    <div className="card-content" />
                    <div className="card-action center-align">
                        <button
                            className="waves-effect waves-light btn blue-grey btn-large darken-4"
                            onClick={this.handleClick}
                        >{`Init ${this.props.size}x${
                            this.props.size
                        } board`}</button>
                    </div>
                </div>
            </div>
        );
    }
}
