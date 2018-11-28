import { createAction } from 'redux-actions';

export const setMessage = createAction('SET_MESSAGE', msg => msg);
