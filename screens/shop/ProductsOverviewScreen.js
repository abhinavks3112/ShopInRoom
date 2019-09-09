import React from 'react';
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
import { addToCart } from '../../store/actions/cartAction';


const ProductsOverview = (props) => {
    const { navigation } = props;
    const productsList = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const onSelectItemHandler = (id, title) => (
        navigation.navigate(
            'ProductsDetails', {
                productId: id,
                productTitle: title
            }
        )
    );

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
    }
});

export default ProductsOverview;
