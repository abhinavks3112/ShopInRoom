import { AUTHENTICATE } from '../actions/types';

const INITIAL_STATE = {
   token: null,
   userId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                token: action.token,
                userId: action.userId
            };
        }
        /* case SIGNUP: {
            return {
                token: action.token,
                userId: action.userId
            };
        } */
        default:
            return state;
    }
};
