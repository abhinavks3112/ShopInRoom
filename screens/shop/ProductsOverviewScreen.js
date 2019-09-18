import React, { useEffect, useState, useCallback } from 'react';
import {
    Button,
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import ProductCard from '../../components/ProductCard';
import Colors from '../../constants/Colors';

import * as productActions from '../../store/actions/productsAction';
import { addToCart } from '../../store/actions/cartAction';
import BodyText from '../../components/BodyText';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';

const ProductsOverview = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
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
        // Setting refreshing true/false for subsequent refresh, but not initial render
        setIsRefreshing(true);
        try {
        await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch]);

    /* In stack naviagtion, moving back from one stack and then going back destroys and recreate
    that component, but in drawer navigation, everything is kept in memory so all pages are loaded
    once and hence any change in server doesn't get fetched, since fetch will only get called
    on re-render which is not happening here, so, for this, we need to set up a naviagtion listener
    and on change of navigation, call our server for fetching data. */
    useEffect(() => {
        /* Listener will be added after the component has finished rendering for the first time,
        so it won't fire initially, product won't be loaded. It will only work second time, i.e
        after naviagting back to this component from some othe component.
        Second useEffect down below will take care of loading product for first time since
        it is not adding any listener, just calling fetch immediatly. */
        const willFocusListener = navigation.addListener('willFocus', loadProducts);

        /* Return a cleanup function which runs
        1. component is unmounted or destroyed
        2. useEffect is about to re-run.
        So here, we will cleanup the listener otherwise
        a new listener instance will pop up on each render
        and we will end up with multiple listener listening to same event */
        return (() => {
            willFocusListener.remove();
        });

    /* Will avoid adding navigation to dependency since if something else in naviagtion changes,
    it will cause it to re-run eg. if setParams to communicate with our header navigation,
    then we could enter an infinite loop here */
    }, [loadProducts]);

    /* Second useEffect, fires as soon as component is loaded */
    useEffect(() => {
        // Setting loading true/false for initial render only
        setIsLoading(true);
        loadProducts().then(setIsLoading(false));
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
        <Error
        errorText={error}
        onReloadDoThis={loadProducts}
        buttonColor={Colors.Primary}
        />
        );
    }

    // Show a spinner if loading is not finished
    if (isLoading) {
        return (
            <Spinner
            spinnerSize="large"
            spinnerColor={Colors.Primary}
            />
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
            // Pull to refresh functionality
            // automatically provides spinner
            onRefresh={loadProducts}
            // setting this property mandatory with refresh
            refreshing={isRefreshing}
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
    }
});

export default ProductsOverview;
