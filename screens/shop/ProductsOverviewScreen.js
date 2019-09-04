import React from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/ProductCard';

const ProductsOverview = (props) => {
    const { navigation } = props;
    const productsList = useSelector((state) => state.products.availableProducts);
    return (
        <View style={styles.screen}>
            <FlatList
            data={productsList}
            renderItem={(itemData) => (
                        <ProductCard
                        id={itemData.item.id}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        imageUrl={itemData.item.imageUrl}
                        onViewDetails={() => navigation.navigate(
                            'ProductsDetails', {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            }
                        )}
                        onAddToCart={() => {}}
                        />
            )}
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
