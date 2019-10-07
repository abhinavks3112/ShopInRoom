import { SIGNUP, SIGNIN } from './types';
import ENV from '../../env';

// eslint-disable-next-line import/prefer-default-export
export const signUp = (email, password) => async (dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.REACT_APP_FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        const errorId = errorResponse.error.message;
        let message = 'Error Signing In!!';
        if (errorId === 'EMAIL_EXISTS') {
            message = 'The email id already exists!!';
        } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
            message = 'We have blocked all requests from this device due to too many failed attempts. Try again later.!!';
        }
        throw new Error(message);
    }

    const result = await response.json();

    console.log(result);

    dispatch({
        type: SIGNUP,
        token: result.idToken,
        userId: result.localId
    });
};

export const signIn = (email, password) => async (dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.REACT_APP_FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        const errorId = errorResponse.error.message;
        let message = 'Error Signing In!!';
        if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'The email id does not exist, please Sign Up!!';
        } else if (errorId === 'INVALID_PASSWORD') {
            message = 'The email and password do not match, please try again!!';
        } else if (errorId === 'USER_DISABLED') {
            message = 'The user has been disabled by the admin!!';
        }
        throw new Error(message);
    }

    const result = await response.json();

    console.log(result);

    dispatch({
        type: SIGNIN,
        token: result.idToken,
        userId: result.localId
    });
};
