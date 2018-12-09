import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

import { isBoardInit } from '../reducers/board';
import { initBoard } from '../actions/board';

import BoardSelector from './BoardSelector';
import Board from './Board';
import GameFooter from './GameFooter';

class App extends Component {
    // componentDidMount() {
    //     this.props.initBoard(this.props.size);
    // }

    static propTypes = {
        isBoardInit: bool.isRequired,
        initBoard: func.isRequired,
    };

    static defaultProps = {
        isBoardInit: false,
    };

    renderBoardSelectors = () => (
        <div className="row">
            <BoardSelector size={9} initBoard={this.props.initBoard} />
            <BoardSelector size={13} initBoard={this.props.initBoard} />
            <BoardSelector size={19} initBoard={this.props.initBoard} />
        </div>
    );

    renderBoard = () => (
        <div>
            <div className="container">
                <Board />
            </div>
            <GameFooter />
        </div>
    );

    render = function() {
        return (
            <div id="app">
                {this.props.isBoardInit
                    ? this.renderBoard()
                    : this.renderBoardSelectors()}
            </div>
        );
    };
}

const mapStateToProps = ({ board }) => ({
    isBoardInit: isBoardInit(board),
});

export const mapDispatchToProps = {
    initBoard,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
