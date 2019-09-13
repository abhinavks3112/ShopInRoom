import React, { useEffect, useCallback, useReducer } from 'react';
import {
 View,
 Text,
 TextInput,
 ScrollView,
 StyleSheet,
 Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/HeaderButton';
import TitleText from '../../components/TitleText';
import * as ProductAction from '../../store/actions/productsAction';

// action type
const FORM_INPUT_CHANGE = 'FORM_INPUT_CHANGE';

// reducer
const formInputReducer = (state, action) => {
    switch (action.type) {
        default: return state;
    }
};

const EditProductsScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const prodId = navigation.getParam('id');

    const editedProduct = useSelector((state) => state.products.userProducts.find(
        (product) => product.id === prodId
    ));

    /* Using the reducer using useReducer and supplying initial state values
    and getting an array in return which has slice of state variable or state snapshot
    and dispatch function */
    const [formInputState, dispatchFormActions] = useReducer(formInputReducer, {
        inputs: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidator: {
            title: !!editedProduct,
            imageUrl: !!editedProduct,
            description: !!editedProduct,
            price: !!editedProduct
        },
        isFormValid: !!editedProduct
    });

    /* If we do not specify the title, description, etc in the dependency list then
    the value for those variables inside never updates when the user changes
    those value, they always remain blank or initial values */
    const submitHandler = useCallback(() => {
        if (!isTitleValid) {
            Alert.alert('Wrong Input!!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
            return;
        }
        if (editedProduct) {
            dispatch(ProductAction.updateProduct(
            prodId, title, imageUrl, description
            ));
        } else {
            /* Adding unary plus if your string is already in the form of an integer:
            + sign before price convert it from string to number */
            dispatch(ProductAction.createProduct(
            title, imageUrl, description, +price
            ));
        }
        navigation.navigate('UserProducts');
    }, [description, dispatch, editedProduct, imageUrl, price, prodId, title]);

     /* Passing function to navigationOptions below so that it can be used in onPress
    action of save button */
    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const titleChangeHandler = (text) => {
        let isValid = false;
        if (text.trim().length > 0) {
           isValid = true;
        }
        /* Dispatching action as an object with action type and
        any other necessary data(property name can be anything) */
        dispatchFormActions({
            type: FORM_INPUT_CHANGE,
            value: text,
            isValid,
            inputId: 'title'
        });
    };

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <TitleText style={styles.label}>Title</TitleText>
                        <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={titleChangeHandler}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect
                        autoFocus
                        returnKeyType="next" // Only displays the return key on keyboard as next button
                        />
                        {
                            !isTitleValid
                        && <Text>Please enter a valid title!!</Text>
                        }
                    </View>
                    <View style={styles.formControl}>
                        <TitleText style={styles.label}>Image Url</TitleText>
                        <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        keyboardType="url"
                        />
                    </View>
                    <View style={styles.formControl}>
                        <TitleText style={styles.label}>Description</TitleText>
                        <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        keyboardType="default"
                        multiline
                        />
                    </View>
                    {
                        editedProduct
                        ? null
                        : (
                            <View style={styles.formControl}>
                                <TitleText style={styles.label}>Price</TitleText>
                                <TextInput
                                style={styles.input}
                                value={price}
                                onChangeText={(text) => setPrice(text)}
                                keyboardType="decimal-pad"
                                />
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
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
       /*  justifyContent: 'center',
        alignItems: 'center' */
    },
    form: {
        margin: 10,
        padding: 10
    },
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

export default EditProductsScreen;
