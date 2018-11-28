import * as actions from '../ui';

describe('ui action creators', () => {
    it('should create an action to set the message', () => {
        expect(actions.setMessage('ATARI!')).toEqual({
            type: 'SET_MESSAGE',
            payload: 'ATARI!',
        });
    });
});
