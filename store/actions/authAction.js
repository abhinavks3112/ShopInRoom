import { AsyncStorage } from 'react-native';
import { AUTHENTICATE, SIGNOUT } from './types';
import ENV from '../../env';

let timer = null;

export const authenticate = (userId, token, expiryTime) => (dispatch) => {
    dispatch(setSignOutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token });
};

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
        // json() is asynchronous and returns a Promise object that resolves to a JavaScript object.
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

    // expiresIn is in string, and indicates seconds so converting it to milliseconds and also int
    const expiryTime = parseInt(result.expiresIn) * 1000;

    dispatch(authenticate(result.localId, result.idToken, expiryTime));

    const expirationDate = new Date(new Date().getTime() + expiryTime);

    saveDataToStorage(result.idToken, result.localId, expirationDate);
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

    // expiresIn is in string, and indicates seconds so converting it to milliseconds and also int
    const expiryTime = parseInt(result.expiresIn) * 1000;

    dispatch(authenticate(result.localId, result.idToken, expiryTime));

    // Token expiration Date
    // converting milliseconds result back to Date
    const expirationDate = new Date(new Date().getTime() + expiryTime);

    saveDataToStorage(result.idToken, result.localId, expirationDate);
};

export const signOut = () => async (dispatch) => {
    clearSignOutTimer();
    await AsyncStorage.removeItem('userData');
    dispatch({ type: SIGNOUT });
};

const clearSignOutTimer = () => {
    if (timer) {
        // Built in js function to get rid of timer
        clearTimeout(timer);
    }
};

// expirationTime should be provided in milliseconds
const setSignOutTimer = (expirationTime) => (dispatch) => {
    // setTimeout: Built in js function
    // Callback function called after timer expires in expirationTime
    timer = setTimeout(() => {
        dispatch(signOut());
    }, expirationTime);
    return timer;
};
const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token,
            userId,
            expiryDate: expirationDate.toISOString()
        })
    );
};
