import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { initBoard } from '../actions/board';

import Board from './Board';
import Captured from './Captured';
import BoardMessage from './BoardMessage';
import PassButton from './PassButton';
import ResetButton from './ResetButton';

class App extends Component {
    componentDidMount() {
        this.props.initBoard(this.props.size);
    }

    static propTypes = {
        initBoard: func.isRequired,
    };

    render = function() {
        return (
            <div id="app">
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
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: 100,
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <PassButton />
                            <ResetButton />
                        </div>
                        <Captured />
                        <BoardMessage />
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({});

export const mapDispatchToProps = {
    initBoard,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
