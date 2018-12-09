import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { quitGame } from '../actions/board';

export class QuitGameButton extends Component {
    static propTypes = {
        quitGame: func.isRequired,
    };

    handleClick = () => {
        this.props.quitGame();
    };

    render = function() {
        return (
            <button
                className="waves-effect waves-light btn blue-grey darken-4"
                id="quit-game-btn"
                onClick={this.handleClick}
            >
                {'Quit game'}
            </button>
        );
    };
}

const mapStateToProps = state => ({});

export const mapDispatchToProps = {
    quitGame,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(QuitGameButton);
