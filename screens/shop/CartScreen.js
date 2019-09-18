import React, { useState, useEffect } from 'react';
import {
 View, StyleSheet, Button, FlatList, Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// components
import Colors from '../../constants/Colors';
import TitleText from '../../components/TitleText';
import BodyText from '../../components/BodyText';
import CartItem from '../../components/CartItems';
import Card from '../../components/Card';
import Spinner from '../../components/Spinner';

// actions
import { removeFromCart } from '../../store/actions/cartAction';
import { addOrder } from '../../store/actions/ordersAction';

const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
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

    // Display an alert if an error is encountered
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const sendOrderHandler = async () => {
        try {
        setError(null);
        setIsLoading(true);
        // Always put await when using async
        // Note: if await not put, catch won't be able to catch error in try catch format
        await dispatch(addOrder(itemsInCart, totalAmount));
        } catch (err) {
           setError(err.message);
        }
        setIsLoading(false);
    };

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
        return null;
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <View>
                    <BodyText style={styles.summaryText}>
                        Total:
                        {' '}
                        <TitleText style={styles.amount}>
                        $
                        {/* To handle negative number case scenario, rounding the number */}
                        {Math.round(totalAmount.toFixed(2) * 100) / 100}
                        </TitleText>
                    </BodyText>
                </View>
                {isLoading
                ? (
                    <Spinner
                    spinnerSize="small"
                    spinnerColor={Colors.Accent}
                    />
                )
                : (
                    <Button
                    title="Order Now"
                    onPress={sendOrderHandler}
                    color={Colors.Accent}
                    disabled={itemsInCart.length === 0}
                    />
                )}
            </Card>
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
        padding: 10
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
