import React from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/ProductCard';

const renderProductCard = (itemData) => (
        <ProductCard
        title={itemData.item.title}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
        onViewDetails={() => {}}
        onAddToCart={() => {}}
        />
);

const ProductsOverview = () => {
    const productsList = useSelector((state) => state.products.availableProducts);
    return (
        <View style={styles.screen}>
            <FlatList
            data={productsList}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            />
        </View>
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
    },
    productCard: {
        width: '100%'
    }
});

export default ProductsOverview;
