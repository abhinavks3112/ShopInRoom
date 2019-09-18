import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import OrderItem from '../../components/OrderItem';
import Error from '../../components/Error';
import Colors from '../../constants/Colors';
import Spinner from '../../components/Spinner';

import { fetchOrders } from '../../store/actions/ordersAction';
import BodyText from '../../components/BodyText';

const OrdersScreen = (props) => {
    const { navigation } = props;
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orders.orders);

    const loadOrders = useCallback(async () => {
        try {
            setError(null);
            setisLoading(true);
            console.log('Dispatching order fetch action');
            await dispatch(fetchOrders());
        } catch (err) {
            setError(err.message);
        }
        setisLoading(false);
    }, [dispatch]);

    /* Load product on load */
    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

     /* Attach a nav event listener and load product
     when coming back after nav change */
     useEffect(() => {
        const willFocusListener = navigation.addListener('willFocus', loadOrders);
        return (() => {
            willFocusListener.remove();
        });
    }, [loadOrders]);

    if (error) {
        return <Error errorText={error} onReloadDoThis={loadOrders} buttonColor={Colors.Primary} />;
    }

    if (isLoading) {
        return (
            <Spinner
            spinnerSize="large"
            spinnerColor={Colors.Primary}
            />
        );
    }

    if (!isLoading && orderList.length === 0) {
        return (
            <View style={styles.screen}>
                <BodyText>No orders!! Its time to do some shopping!!</BodyText>
            </View>
        );
    }

    return (
        <FlatList
        data={orderList}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
            <OrderItem
            orderId={itemData.item.id}
            orderDate={itemData.item.getReadableDate}
            orderItems={itemData.item.items}
            totalAmount={itemData.item.totalAmount}
            />
        )}
        />
    );
};

OrdersScreen.navigationOptions = (navData) => ({
        headerTitle: 'Orders Screen',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                title="Menu"
                iconName="menu"
                onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        )
});

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;
