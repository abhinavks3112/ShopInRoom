import React, { useState, useEffect, useCallback } from 'react';
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

const EditProductsScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const prodId = navigation.getParam('id');

    const editedProduct = useSelector((state) => state.products.userProducts.find(
        (product) => product.id === prodId
    ));

    // value for textinput
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    const [price, setPrice] = useState('');

    // validation for input state
    const [isTitleValid, setIsTitleValid] = useState(false);

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
        if (text.trim().length === 0) {
            setIsTitleValid(false);
        } else {
            setIsTitleValid(true);
        }
        setTitle(text);
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
