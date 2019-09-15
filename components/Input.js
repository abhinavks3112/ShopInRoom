import React, { useReducer, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput
} from 'react-native';

import TitleText from './TitleText';

// action types
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

// reducer function
const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE: {
           console.log('Input change action triggered with value ', action.value, ' and validity', action.isValid);
           return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        }
        case INPUT_BLUR: {
            console.log('Focus is lost now');
            return {
                ...state,
                touched: true
            };
        }
        default:
            return state;
    }
};

const Input = (props) => {
    const {
        id, label, errorText, initialValue, initiallyValid, onInputChange
    } = props;
    console.log('Inpu comp called for label', label);
    /* Returned: Slice of state, Dispatch function
    Parameter: Specified the reducer, initial state values */
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || '',
        isValid: initiallyValid,
        /* To indicate when the if the user has moved away to another textInput or not,
        and then show validation error */
        touched: false
    });

    /* We have value of each keystroke that user entered and its validity, so
    we will forward this data to parent using useEffect after the user has
    left the current input box */
    useEffect(() => {        
            /* Expect to receive a function from parent which will receive these arguments */
            onInputChange(id, inputState.value, inputState.isValid);      
    }, [id, inputState, onInputChange]);

    // Check validity of input on each keystroke
    const textChangeHandler = (text) => {
        let isValid = true;

        // validation for different types of inputs
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

         // required field validator
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        // email validator
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        // min number range validator
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        // max number range validator
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        // min text length validator
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }
        console.log('In Input change handler, action is now beiung dispatched');
        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid
        });
    };

    /*  Set indicator to indicate current input box has lost focus,
    i.e user has moved away to to another input box */
    const lostFocusHandler = () => {
        dispatch({
            type: INPUT_BLUR
        });
    };

    return (
        <View style={styles.formControl}>
            <TitleText style={styles.label}>{label}</TitleText>
            <TextInput
            {...props}
            style={styles.input}
            value={inputState.value}
            onChangeText={(text) => textChangeHandler(text)}
            onBlur={lostFocusHandler}
            />
            {
                !inputState.isValid
            && <Text>{errorText}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 10
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default Input;
