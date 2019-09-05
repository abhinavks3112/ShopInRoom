import React from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import ProductCard from '../../components/ProductCard';
import { addToCart } from '../../store/actions/cartAction';

const ProductsOverview = (props) => {
    const { navigation } = props;
    const productsList = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

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
                        onAddToCart={() => dispatch(addToCart(itemData.item))}
                        />
            )}
            keyExtractor={(item) => item.id}
            />
        </View>
    );
};

ProductsOverview.navigationOptions = (navData) => ({
        headerTitle: 'Products',
        headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
            title="Cart"
            iconName="shopping-cart"
            onPress={() => navData.navigation.navigate('Cart')}
            />
        </HeaderButtons>
        )
});

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
