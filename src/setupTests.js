import 'jest-chain';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import diff from 'jest-diff';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

expect.extend({
    toNotHaveMutatedFrom(received, expected) {
        const pass = isEqual(received, expected);

        const message = pass
            ? () =>
                  this.utils.matcherHint('.not.toNotHaveMutatedFrom') +
                  '\n\n' +
                  `Expected state to have mutated.`
            : () => {
                  const diffString = diff(expected, received, {
                      expand: this.expand,
                  });
                  return (
                      this.utils.matcherHint('.toNotHaveMutatedFrom') +
                      '\n\n' +
                      `Expected state not to have mutated.` +
                      (diffString ? `\n\nDifference:\n\n${diffString}` : '')
                  );
              };

        return { actual: received, message, pass };
    },
});

export const THOR = reducer => (state, action) => {
    const originalState = cloneDeep(state);
    const newState = reducer(state, action);

    expect(state).toNotHaveMutatedFrom(originalState);

    return newState;
};
