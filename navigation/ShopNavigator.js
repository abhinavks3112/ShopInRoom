import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { MaterialIcons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductsDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import { signOut } from '../store/actions/authAction';

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

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProducts: EditProductsScreen
}, {
    navigationOptions: {
        /* Applies an icon before the name entries in drawer menu */
        drawerIcon: (drawerConfig) => (
        /* drawerConfig.tintColor applies color according to whether it is selected or not */
        <MaterialIcons
        name="create"
        size={18}
        color={drawerConfig.tintColor}
        />
        )
    },
    defaultNavigationOptions: defaultHeaderStyle
});

const CustomDrawerCompSignOut = (props) => {
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, paddingTop: 40 }}>
            {/* forceInset controls padding to be applied */}
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerNavigatorItems {...props} />
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <Button
                    title="Sign Out"
                    color={Colors.Primary}
                    onPress={() => {
                        dispatch(signOut());
                    }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNaviagtor,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.Primary
    },
    contentComponent: CustomDrawerCompSignOut
});

const AuthNavigator = createStackNavigator({
    Authentication: AuthScreen
}, {
    defaultNavigationOptions: defaultHeaderStyle
});

const MainNavigator = createSwitchNavigator({
    StartUp: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
