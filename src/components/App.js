import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

import { isBoardInit } from '../reducers/board';
import { initBoard } from '../actions/board';

import BoardSelector from './BoardSelector';
import Board from './Board';
import Captured from './Captured';
import ActiveColor from './ActiveColor';
import BoardMessage from './BoardMessage';
import PassButton from './PassButton';
import ResetBoardButton from './ResetBoardButton';
import QuitGameButton from './QuitGameButton';

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
            <div
                className="page-footer blue-grey darken-2"
                style={{
                    marginTop: 20,
                    padding: 20,
                }}
            >
                <div
                    className="container"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <PassButton />
                    <ActiveColor />
                    <Captured />
                    <BoardMessage />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: 100,
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <ResetBoardButton />
                        <QuitGameButton />
                    </div>
                </div>
            </div>
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
