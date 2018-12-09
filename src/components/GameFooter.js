import React, { Component } from 'react';

import Captured from './Captured';
import ActiveColor from './ActiveColor';
import BoardMessage from './BoardMessage';
import PassButton from './PassButton';
import ResetBoardButton from './ResetBoardButton';
import QuitGameButton from './QuitGameButton';

export default class extends Component {
    render() {
        return (
            <div
                id="game-footer"
                className="page-footer blue-grey darken-2 row"
            >
                <div className="section col s6 m3">
                    <PassButton />
                </div>
                <div className="section section-vertical col s6 m1">
                    <ActiveColor />
                    <BoardMessage />
                </div>
                <div className="section col s12 m4">
                    <Captured />
                </div>
                <div className="section col s12 m4">
                    <ResetBoardButton />
                    <QuitGameButton />
                </div>
            </div>
        );
    }
}
