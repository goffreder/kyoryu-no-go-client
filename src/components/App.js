import React, { Component } from 'react';

import Board from './components/Board';
import BoardMessage from './components/BoardMessage';
import PassButton from './components/PassButton';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: props.board,
        };
    }
    onBoardUpdate = () => {
        this.setState({ board: this.props.board });
    };
    render = function() {
        return (
            <div>
                <BoardMessage board={this.state.board} />
                <PassButton board={this.state.board} />
                <Board
                    board={this.state.board}
                    onPlay={this.onBoardUpdate.bind(this)}
                />
            </div>
        );
    };
}
