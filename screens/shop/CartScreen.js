import React from 'react';
import {
 View, StyleSheet, Button, FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// components
import Colors from '../../constants/Colors';
import TitleText from '../../components/TitleText';
import BodyText from '../../components/BodyText';
import CartItem from '../../components/CartItems';

// actions
import { removeFromCart } from '../../store/actions/cartAction';
import { addOrder } from '../../store/actions/ordersAction';

const CartScreen = () => {
    const itemsInCart = useSelector((state) => {
        const transformedCartItems = [];
        // eslint-disable-next-line no-restricted-syntax
        // eslint-disable-next-line guard-for-in
        for (const key in state.carts.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.carts.items[key].productTitle,
                productPrice: state.carts.items[key].productPrice,
                quantity: state.carts.items[key].quantity,
                sum: state.carts.items[key].sum
            });
        }
        return transformedCartItems;
    });

    const dispatch = useDispatch();
    const totalAmount = useSelector((state) => state.carts.totalAmount);

    const renderItemList = () => {
        if (itemsInCart.length !== 0) {
            return (
                <FlatList
                    data={itemsInCart}
                    renderItem={(itemData) => (
                        <CartItem
                        title={itemData.item.productTitle}
                        quantity={itemData.item.quantity}
                        sum={itemData.item.sum}
                        onDelete={() => dispatch(removeFromCart(itemData.item))}
                        deletable
                        />
                    )}
                    keyExtractor={(item) => item.productId}
                />
            );
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <BodyText style={styles.summaryText}>
                    Total:
                    {' '}
                    <TitleText style={styles.amount}>
                    $
                    {/* To handle negative number case scenario, rounding the number */}
                    {Math.round(totalAmount.toFixed(2) * 100) / 100}
                    </TitleText>
                </BodyText>
                <Button
                title="Order Now"
                onPress={() => dispatch(addOrder(itemsInCart, totalAmount))}
                color={Colors.Accent}
                disabled={itemsInCart.length === 0} // Disable button if no item added
                />
            </View>
            {renderItemList()}
        </View>
    );
};

CartScreen.navigationOptions = () => ({
        headerTitle: 'Cart'
});

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        // layout
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,

        // border
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,

        // shadow
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 10,
        shadowOpacity: 0.3
    },
    summaryText: {
        fontSize: 18,
        fontFamily: 'roboto-bold'
    },
    amount: {
        fontSize: 20,
        color: Colors.Primary
    },
    noItemsInCart: {
        marginVertical: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItemsInCarText: {
        color: Colors.Primary,
        textAlign: 'center'
    }
});

export default CartScreen;
