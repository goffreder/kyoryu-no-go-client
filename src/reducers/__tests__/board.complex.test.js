import reducer from '../board';
import * as actions from '../../actions/board';
import { board } from '../../constants';

describe('board complex tests', () => {
    it('should count the correct amount of captured stones', () => {
        let newState = reducer();

        newState = reducer(newState, actions.initBoard(5));
        newState = reducer(newState, actions.play(4, 0));
        newState = reducer(newState, actions.play(3, 0));
        newState = reducer(newState, actions.play(4, 1));
        newState = reducer(newState, actions.play(3, 1));
        newState = reducer(newState, actions.play(4, 2));
        newState = reducer(newState, actions.play(3, 2));
        newState = reducer(newState, actions.play(4, 3));
        newState = reducer(newState, actions.play(3, 3));
        newState = reducer(newState, actions.play(4, 4));
        newState = reducer(newState, actions.play(3, 4));
        newState = reducer(newState, actions.play(2, 0));
        newState = reducer(newState, actions.play(4, 0));
        newState = reducer(newState, actions.play(2, 1));
        newState = reducer(newState, actions.play(4, 1));
        newState = reducer(newState, actions.play(2, 2));
        newState = reducer(newState, actions.play(4, 2));
        newState = reducer(newState, actions.play(2, 3));
        newState = reducer(newState, actions.play(4, 3));
        newState = reducer(newState, actions.play(2, 4));
        newState = reducer(newState, actions.play(1, 0));
        newState = reducer(newState, actions.play(4, 4));

        expect(newState.captured).toEqual({
            [board.WHITE]: 9,
            [board.BLACK]: 5,
        });
    });
});
