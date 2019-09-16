import React, { useEffect, useState, useCallback } from 'react';
import {
    Button,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator // Spinner
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import ProductCard from '../../components/ProductCard';
import Colors from '../../constants/Colors';

import * as productActions from '../../store/actions/productsAction';
import { addToCart } from '../../store/actions/cartAction';
import BodyText from '../../components/BodyText';
import TitleText from '../../components/TitleText';


const ProductsOverview = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const productsList = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    /* To use aync wait in useEffect, we need to create a dummy
    wrapper function inside, otherwise it won't work, because then,
    useEffect will return a promise, which is not how useEffect work */
    const loadProducts = useCallback(async () => {
        /* Multiple setState calls are batched together so,
        the following won't cause multiple re-render cycles */
        setError(null);
        setIsLoading(true);
        try {
        await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const onSelectItemHandler = (id, title) => (
        navigation.navigate(
            'ProductsDetails', {
                productId: id,
                productTitle: title
            }
        )
    );

    // If we encounter an error dispaly error message
    if (error) {
        return (
            <View style={styles.screen}>
                <TitleText>{error}</TitleText>
                <View style={styles.tryAgain}>
                    <Button
                    title="Try Again"
                    onPress={loadProducts}
                    color={Colors.Primary}
                    />
                </View>
            </View>
        );
    }

    // Show a spinner if loading is not finished
    if (isLoading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator
                size="large"
                color={Colors.Primary}
                />
            </View>
        );
    }

    // If loading is finished and we have no products to show
    if (!isLoading && productsList.length === 0) {
        return (
            <View style={styles.screen}>
               <BodyText>No Products found, maybe try adding some!!</BodyText>
            </View>
        );
    }

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
                        onSelect={() => (
                            onSelectItemHandler(itemData.item.id, itemData.item.title)
                            )}
                        >
                            <View style={styles.actions}>
                                <Button
                                title="View Details"
                                onPress={() => (
                                    onSelectItemHandler(itemData.item.id, itemData.item.title)
                                    )}
                                color={Colors.Primary}
                                style={styles.button}
                                />
                                <Button
                                title="Add To Cart"
                                onPress={() => dispatch(addToCart(itemData.item))}
                                color={Colors.Accent}
                                style={styles.button}
                                />
                            </View>
                        </ProductCard>
            )}
            keyExtractor={(item) => item.id}
            />
        </View>
    );
};

ProductsOverview.navigationOptions = (navData) => ({
        headerTitle: 'Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                title="Menu"
                iconName="menu"
                onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
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
    actions: {
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 2
    },
    button: {
        borderRadius: 10
    },
    tryAgain: {
        marginVertical: 10
    }
});

export default ProductsOverview;
