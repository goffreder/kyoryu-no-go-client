import reducer, * as ui from '../ui';
import * as actions from '../../actions/ui';

describe('ui reducer', () => {
    it('should return the initial state', () => {
        expect(reducer()).toEqual(ui.defaultState);
    });

    it('should handle SET_MESSAGE', () => {
        expect(reducer(ui.defaultState, actions.setMessage('ATARI!'))).toEqual({
            ...ui.defaultState,
            message: 'ATARI!',
        });
    });
});

describe('ui selectors', () => {
    it('should get the board message', () => {
        expect(
            ui.getMessage(
                reducer(ui.defaultState, actions.setMessage('ATARI!')),
            ),
        ).toEqual('ATARI!');
    });
});
