import { defaultState } from '..';
import { defaultState as boardState } from '../board';

describe('reducers', () => {
    it('should export the proper composed defaultState', () => {
        expect(defaultState).toEqual({
            board: boardState,
        });
    });
});
