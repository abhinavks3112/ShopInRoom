import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator';

// Wrapper for main naviagtor so that we have access to redux for whole application
const NavigationContainer = (props) => {
    /* Since navigation prop can't be accesses outside of navigator component, react
    navigation gives us an alternate to using this props using useRef pointed to main
    navigator, therby establishing a connection between the two  */
    const navRef = useRef();
    const isAuth = useSelector((state) => !!state.auth.token);

    useEffect(() => {
        if (!isAuth) {
            /* dispatch is provided by the createAppContainer component(since ShopNavigator)
            is nothing but the appContainer component.
            This dispatch can be used to dispatch a navigationAction */
            navRef.current.dispatch(
                NavigationActions.navigate({
                    routeName: 'Auth'
                })
            );
        }
    }, [isAuth]);

    return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
