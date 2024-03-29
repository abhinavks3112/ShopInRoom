import React, {
 useEffect, useCallback, useReducer, useState
} from 'react';
import {
 View,
 ScrollView,
 StyleSheet,
 Alert,
 KeyboardAvoidingView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/HeaderButton';
import Spinner from '../../components/Spinner';

import * as ProductAction from '../../store/actions/productsAction';


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

const EditProductsScreen = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const prodId = navigation.getParam('id');

    const editedProduct = useSelector((state) => state.products.userProducts.find(
        (product) => product.id === prodId
    ));

    /* In useReducer we pass the reducer function that we created above
    and in second argument, we pass initial state.
    useReducer returns an array which has slice of state variable or state snapshot
    and dispatch function.
    Name of argument can be anything */
    const [formInputState, dispatchFormActions] = useReducer(formInputReducer, {
        inputs: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: editedProduct ? editedProduct.price : ''
        },
        inputValidator: {
            title: !!editedProduct,
            imageUrl: !!editedProduct,
            description: !!editedProduct,
            price: !!editedProduct
        },
        isFormValid: !!editedProduct
    });

    // Display an alert if an error is encountered
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    /* If we do not specify the title, description, etc in the dependency list then
    the value for those variables inside never updates when the user changes
    those value, they always remain blank or initial values */
    const submitHandler = useCallback(async () => {
        const {
        title, imageUrl, description, price
        } = formInputState.inputs;
        if (!formInputState.isFormValid) {
            Alert.alert('Wrong Input!!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
            return;
        }
        try {
            setError(null);
            setIsLoading(true);
            if (editedProduct) {
                await dispatch(ProductAction.updateProduct(
                prodId, title, imageUrl, description
                ));
            } else {
                /* Adding unary plus if your string is already in the form of an integer:
                + sign before price convert it from string to number */
                await dispatch(ProductAction.createProduct(
                title, imageUrl, description, +price
                ));
            }
            navigation.navigate('UserProducts');
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, editedProduct, formInputState.inputs, formInputState.isFormValid, prodId]);

     /* Passing function to navigationOptions below so that it can be used in onPress
    action of save button */
    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

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

    // Show a spinner if loading is not finished
    if (isLoading) {
        return (
            <Spinner
            spinnerSize="large"
            spinnerColor={Colors.Primary}
            />
        );
    }

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
        >
            <View style={styles.screen}>
                <ScrollView>
                    <View style={styles.form}>
                        <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title!!"
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect
                        returnKeyType="next" // Only displays the return key on keyboard as next button
                        // When we use bind then a new instance will be created each time so it
                        // will re-render and cause infinite loop
                        // beacuse we have used useCallback
                        // onInputChange={inputChangeHandler.bind(this, 'title')}
                        // Same with case here, ie arrow function, anonymous function will be
                        // recreated each render and this
                        // will cause infinite loop
                        // onInputChange={
                        // (inputValue, inputValidity) => inputChangeHandler(
                        //    'title', inputValue, inputValidity
                        //  )
                        // }
                        // So best case scenario is to pass the data and functions
                        // as props to child component
                        // and pass the argument from inside the child component,
                        // by calling the function from inside only,
                        // eg in our case, pass id as props and rest of the arguments,
                        // we are already getting from inside the child component
                        // i.e input value and its validity
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={formInputState.inputValidator.title}
                        // validation criteria
                        required
                        />
                        <Input
                        id="imageUrl"
                        label="Image Url"
                        errorText="Please enter a valid Image Url!!"
                        keyboardType="url"
                        returnKeyType="next" // Only displays the return key on keyboard as next button
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={formInputState.inputValidator.imageUrl}
                        // validation criteria
                        required
                        />
                        <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        multiline
                        numberOfLines={3}
                        autoCorrect
                        returnKeyType="next" // Only displays the return key on keyboard as next button
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={formInputState.inputValidator.description}
                        // validation criteria
                        required
                        minLength={5}
                        />
                        {
                            editedProduct
                            ? null
                            : (
                                <Input
                                id="price"
                                label="Price"
                                errorText="Please enter a valid price!!"
                                keyboardType="decimal-pad"
                                onInputChange={inputChangeHandler}
                                // validation criteria
                                required
                                min={0.1}
                                />
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

EditProductsScreen.navigationOptions = (navData) => {
    const { navigation } = navData;

    const id = navigation.getParam('id');
    const submit = navigation.getParam('submit');

    return {
        headerTitle: id ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Save"
                iconName="save"
                onPress={submit}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
   screen: {
        flex: 1
    },
    form: {
        margin: 10,
        padding: 10
    }
});

export default EditProductsScreen;
