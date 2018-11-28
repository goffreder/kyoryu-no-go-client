import $ from 'jquery';

import each from 'lodash/each';
import isEmpty from 'lodash/isEmpty';

import { board } from './constants';

export var Board = function(size) {
    this.current_color = board.BLACK;
    this.size = size;
    this.board = this.create_board(size);
    this.last_move_passed = false;
};

Board.prototype.create_board = function(size) {
    var m = [];
    for (var i = 0; i < size; i++) {
        m[i] = [];
        for (var j = 0; j < size; j++) m[i][j] = board.EMPTY;
    }
    return m;
};

Board.prototype.switch_player = function() {
    this.current_color =
        this.current_color === board.BLACK ? board.WHITE : board.BLACK;
};

Board.prototype.pass = function() {
    if (this.last_move_passed) this.end_game();
    this.last_move_passed = true;
    this.switch_player();
};

Board.prototype.end_game = function() {
    console.log('GAME OVER');
};

Board.prototype.play = function(i, j) {
    if (this.board[i][j] !== board.EMPTY) return;

    var color = (this.board[i][j] = this.current_color);
    var captured = [];
    var neighbors = this.get_adjacent_intersections(i, j);
    var atari = false;

    var self = this;
    each(neighbors, function(n) {
        var state = self.board[n[0]][n[1]];
        if (state !== board.EMPTY && state !== color) {
            var group = self.get_group(n[0], n[1]);
            if (group['liberties'] === 0) captured.push(group);
            else if (group['liberties'] === 1) atari = true;
        }
    });

    // detect suicide
    if (isEmpty(captured) && this.get_group(i, j)['liberties'] === 0) {
        this.board[i][j] = board.EMPTY;
        $(this).trigger('suicide');
        return;
    }

    each(captured, function(group) {
        each(group['stones'], function(stone) {
            self.board[stone[0]][stone[1]] = board.EMPTY;
        });
    });

    $(this).trigger('update');

    if (atari) $(this).trigger('atari');

    this.last_move_passed = false;
    this.switch_player();
};

Board.prototype.get_adjacent_intersections = function(i, j) {
    var neighbors = [];
    if (i > 0) neighbors.push([i - 1, j]);
    if (j < this.size - 1) neighbors.push([i, j + 1]);
    if (i < this.size - 1) neighbors.push([i + 1, j]);
    if (j > 0) neighbors.push([i, j - 1]);
    return neighbors;
};

Board.prototype.get_group = function(i, j) {
    var color = this.board[i][j];
    if (color === board.EMPTY) return null;

    var visited = {}; // for O(1) lookups
    var visited_list = []; // for returning
    var queue = [[i, j]];
    var count = 0;

    while (queue.length > 0) {
        var stone = queue.pop();
        if (visited[stone]) continue;

        var neighbors = this.get_adjacent_intersections(stone[0], stone[1]);
        var self = this;
        each(neighbors, function(n) {
            var state = self.board[n[0]][n[1]];
            if (state === board.EMPTY) count++;
            if (state === color) queue.push([n[0], n[1]]);
        });

        visited[stone] = true;
        visited_list.push(stone);
    }

    return {
        liberties: count,
        stones: visited_list,
    };
};
