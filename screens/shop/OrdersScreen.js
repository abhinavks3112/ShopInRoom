import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import BodyText from '../../components/BodyText';
import HeaderButton from '../../components/HeaderButton';

const OrdersScreen = () => {
    const orderList = useSelector((state) => state.orders.orders);

    return (
        <FlatList
        data={orderList}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
            console.log('OrederList in flatlist ordersscreen', itemData);
            return <BodyText>{itemData.item.totalAmount}</BodyText>;
        }}
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
