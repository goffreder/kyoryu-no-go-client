export const defaultState = {
    message: null,
};

const reducer = {
    SET_MESSAGE: (state, { payload }) => {
        return {
            ...state,
            message: payload,
        };
    },
};

export const getMessage = state => state.message;

export default (state = defaultState, action = {}) => {
    if (typeof reducer[action.type] === 'undefined') {
        return state;
    }

    return reducer[action.type](state, action);
};
