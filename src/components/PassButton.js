import React, { Component } from 'react';

export default class extends Component {
    handleClick = () => {
        this.props.board.pass();
    };
    render = function() {
        return (
            <input
                id="pass-btn"
                type="button"
                value="Pass"
                onClick={this.handleClick}
            />
        );
    };
}
