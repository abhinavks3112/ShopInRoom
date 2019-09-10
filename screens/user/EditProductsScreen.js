import React, { useState } from 'react';
import {
 View,
 TextInput,
 ScrollView,
 StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/HeaderButton';
import TitleText from '../../components/TitleText';

const EditProductsScreen = (props) => {
    const { navigation } = props;

    const prodId = navigation.getParam('id');

    const editedProduct = useSelector((state) => state.products.userProducts.find(
        (product) => product.id === prodId
    ));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    const [price, setPrice] = useState('');

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <TitleText style={styles.label}>Title</TitleText>
                        <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={styles.formControl}>
                        <TitleText style={styles.label}>Image Url</TitleText>
                        <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        />
                    </View>
                    <View style={styles.formControl}>
                        <TitleText style={styles.label}>Description</TitleText>
                        <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
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
                                />
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    );
};

EditProductsScreen.navigationOptions = (navData) => ({
        headerTitle: navData.navigation.getParam('id') ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Save"
                iconName="save"
                onPress={() => {}}
                />
            </HeaderButtons>
            )
    });

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
