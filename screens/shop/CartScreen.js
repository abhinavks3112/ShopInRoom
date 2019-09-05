import React from 'react';
import {
 View, StyleSheet, Button, FlatList
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import TitleText from '../../components/TitleText';
import BodyText from '../../components/BodyText';
import CartItem from '../../models/cart-item';

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
    const totalAmount = useSelector((state) => state.carts.totalAmount);
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <BodyText style={styles.summaryText}>
                    Total:
                    {' '}
                    <TitleText style={styles.amount}>
                    $
                    {totalAmount.toFixed(2)}
                    </TitleText>
                </BodyText>
                <Button
                title="Order Now"
                onPress={() => {}}
                color={Colors.Accent}
                disabled={itemsInCart.length === 0} // Disable button if no item added
                />
            </View>
            <View>
                <BodyText>
                    Cart Items List
                </BodyText>
                {/* <FlatList
                data={itemsInCart}
                renderItem={() => {}}
                keyExtractor={(item) => item.id}
                /> */}
            </View>
        </View>
    );
};

CartScreen.navigationOptions = () => {
    return ({
        headerTitle: 'Cart'
    });
};

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
    }
});

export default CartScreen;
