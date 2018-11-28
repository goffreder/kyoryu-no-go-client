import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

class BoardMessage extends Component {
    constructor(props) {
        super(props);

        var self = this;
        $(props.board).on('atari', function(e) {
            self.setState({ text: 'ATARI!' });
        });
        $(props.board).on('suicide', function(e) {
            self.setState({ text: 'SUICIDE!' });
        });
        $(props.board).on('update', function(e) {
            self.setState({ text: null });
        });

        this.state = {
            text: null,
        };
    }

    render = function() {
        return <div id="alerts">{this.state.text}</div>;
    };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardMessage);
