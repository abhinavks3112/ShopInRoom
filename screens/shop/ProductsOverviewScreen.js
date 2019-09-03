import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { useSelector } from 'react-redux';

const renderProductCard = (itemData) => (
        <View style={styles.screen}>
            <Text key={itemData.item.id}>{itemData.item.title}</Text>
        </View>
    );

const ProductsOverview = (props) => {
    const productsList = useSelector((state) => state.products.availableProducts);
    return (
        <FlatList
        data={productsList}
        renderItem={renderProductCard}
        />
    );
};

ProductsOverview.navigationOptions = {
    headerTitle: 'Products'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverview;
