import React, { useEffect, useCallback } from 'react';
import { AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import Spinner from '../components/Spinner';
import Colors from '../constants/Colors';

import { authenticate } from '../store/actions/authAction';

const StartupScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const trySignIn = useCallback(async () => {
        const userData = await AsyncStorage.getItem('userData');
        // Not Logged In
        if (!userData) {
            navigation.navigate('Auth');
            return;
        }
        // JSON.parse() is synchronous, can parse a string,
        // and change the resulting returned JavaScript object.
        const transformedUserData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedUserData;

        // To convert from ISODate to normal date format
        const expirationDate = new Date(expiryDate);
        if (expirationDate <= new Date() || !token || !userId) {
            navigation.navigate('Auth');
            return;
        }
        navigation.navigate('Shop');
        dispatch(authenticate(userId, token));
    }, [dispatch]);

    useEffect(() => {
        trySignIn();
    }, [trySignIn]);

    return (<Spinner spinnerSize="large" spinnerColor={Colors.Primary} />);
};

export default StartupScreen;
