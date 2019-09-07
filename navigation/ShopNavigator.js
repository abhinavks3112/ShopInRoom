import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { MaterialIcons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductsDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import Colors from '../constants/Colors';

const defaultHeaderStyle = {
    headerStyle: {
        backgroundColor: Colors.Primary
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: 'roboto-bold'
    }
};

const ProductsNaviagtor = createStackNavigator({
    Products: ProductsOverviewScreen,
    ProductsDetails: ProductsDetailsScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        /* Applies an icon before the name entries in drawer menu */
        drawerIcon: (drawerConfig) => (
        /* drawerConfig.tintColor applies color according to whether it is selected or not */
        <MaterialIcons
        name="shopping-cart"
        size={18}
        color={drawerConfig.tintColor}
        />
        )
    },
    defaultNavigationOptions: defaultHeaderStyle
});

const OrdersNavigator = createStackNavigator({
    Order: OrdersScreen
}, {
    navigationOptions: {
        /* Applies an icon before the name entries in drawer menu */
        drawerIcon: (drawerConfig) => (
        /* drawerConfig.tintColor applies color according to whether it is selected or not */
        <MaterialIcons
        name="list"
        size={18}
        color={drawerConfig.tintColor}
        />
        )
    },
    defaultNavigationOptions: defaultHeaderStyle
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNaviagtor,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.Primary
    }
});

export default createAppContainer(ShopNavigator);
