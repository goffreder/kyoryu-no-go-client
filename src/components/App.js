import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { initBoard } from '../actions/board';

import Board from './Board';
import BoardMessage from './BoardMessage';
import PassButton from './PassButton';

class App extends Component {
    componentDidMount() {
        this.props.initBoard(this.props.size);
    }

    static propTypes = {
        initBoard: func.isRequired,
    };

    render = function() {
        return (
            <div>
                <BoardMessage />
                <PassButton />
                <Board />
            </div>
        );
    };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    initBoard: size => dispatch(initBoard(size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
