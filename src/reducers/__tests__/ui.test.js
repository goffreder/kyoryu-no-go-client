import reducer, { defaultState } from '../ui';

import * as actions from '../../actions/ui';

describe('ui reducer', () => {
    it('should return the initial state', () => {
        expect(reducer()).toEqual(defaultState);
    });

    it('should handle SET_MESSAGE', () => {
        expect(reducer(defaultState, actions.setMessage('ATARI!'))).toEqual({
            ...defaultState,
            message: 'ATARI!',
        });
    });
});
