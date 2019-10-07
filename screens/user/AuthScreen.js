import React, { useState, useCallback, useReducer } from 'react';
import {
    ScrollView, View, StyleSheet, KeyboardAvoidingView, Button, TouchableWithoutFeedback,
    Keyboard, Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { signUp, signIn } from '../../store/actions/authAction';

import Input from '../../components/Input';
import Card from '../../components/Card';
import Spinner from '../../components/Spinner';
import Colors from '../../constants/Colors';

/* START: Refactor it in future */
// action type
const FORM_INPUT_CHANGE = 'FORM_INPUT_CHANGE';

/* A reducer function(different from redux, all reducer function have
same pattern of declaration) to handle our action  */
const formInputReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_CHANGE: {
            const updatedInputValue = {
                ...state.inputs,
                [action.inputId]: action.value
            };

            const updatedInputValidity = {
                ...state.inputValidator,
                [action.inputId]: action.isValid
            };

            let updatedIsFormValid = true;
            let isInputValid = true;
            for (const key in updatedInputValidity) {
                isInputValid = !!updatedInputValidity[key];
                updatedIsFormValid = updatedIsFormValid && isInputValid;
            }

            return {
                ...state,
                inputs: updatedInputValue,
                inputValidator: updatedInputValidity,
                isFormValid: updatedIsFormValid
            };
        }
        default: return state;
    }
};
/* END:  */

const AuthScreen = (props) => {
    const { navigation } = props;
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    /* START: Refactor it in future */
 /* In useReducer we pass the reducer function that we created above
    and in second argument, we pass initial state.
    useReducer returns an array which has slice of state variable or state snapshot
    and dispatch function.
    Name of argument can be anything */
    const [formInputState, dispatchFormActions] = useReducer(formInputReducer, {
        inputs: {
           email: '',
           password: ''
        },
        inputValidator: {
            email: false,
            password: false
        },
        isFormValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            /* Using the dispatch function that we got returned from useReducer,
            we can pass action with an action type name(we can use any variable name to denote
            type eg. id, type, etc) and any other necessary data(property name can be anything),
            same as in redux */
            dispatchFormActions({
                type: FORM_INPUT_CHANGE,
                value: inputValue,
                isValid: inputValidity,
                 /* To know which input triggered it, should be same as
                specified in initial state of useReducer */
                inputId: inputIdentifier
            });
        }, [dispatchFormActions]
    );
    /* END:  */

    const authButtonHandler = useCallback(async () => {
        let action = null;
        if (isSignUp) {
            action = signUp(
                        formInputState.inputs.email,
                        formInputState.inputs.password
                    );
        } else {
            action = signIn(
                    formInputState.inputs.email,
                    formInputState.inputs.password
                    );
        }
        setIsLoading(true);
        try {
            await dispatch(action);
            navigation.navigate('Shop');
        } catch (err) {
            const errorHeading = `${isSignUp ? 'SignUp' : 'SignIn'} failed!!`;
            Alert.alert(errorHeading, err.message, [{ text: 'Okay' }]);
            setIsLoading(false);
        }
    }, [dispatch, formInputState.inputs.email, formInputState.inputs.password, isSignUp]);

    return (
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={20}
        style={styles.screen}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <LinearGradient
                colors={['#F95700FF', '#FFCF75']}
                style={styles.gradient}
                >
                    <Card style={styles.card}>
                        <ScrollView>
                            <Input
                            id="email"
                            label="Email"
                            placeholder="abc@example.com"
                            errorText="Please enter a valid email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onInputChange={inputChangeHandler}
                            email
                            required
                            />
                            <Input
                            id="password"
                            label="Password"
                            placeholder="password"
                            errorText="Please enter a valid password"
                            autoCapitalize="none"
                            secureTextEntry
                            onInputChange={inputChangeHandler}
                            required
                            minLength={5}
                            />
                        {isLoading
                            ? (
                                <Spinner
                                spinnerSize="large"
                                spinnerColor={Colors.Primary}
                                />
                            )
                            : (
                                <View>
                                    <View style={styles.buttonsContainer}>
                                        <Button
                                        title={isSignUp ? 'SignUp' : 'SignIn'}
                                        color={Colors.Primary}
                                        onPress={authButtonHandler}
                                        />
                                    </View>
                                    <View style={styles.buttonsContainer}>
                                        <Button
                                        title={`Switch to ${isSignUp ? 'SignIn' : 'SignUp'}`}
                                        color={Colors.Accent}
                                        onPress={() => {
                                            setIsSignUp((prevState) => !prevState);
                                        }}
                                        />
                                    </View>
                                </View>
                        )}
                        </ScrollView>
                    </Card>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = (navData) => ({
        headerTitle: 'Login'
});

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        backgroundColor: 'white'
    },
    buttonsContainer: {
        marginTop: 10,
        alignItems: 'center'
    }
});

export default AuthScreen;
