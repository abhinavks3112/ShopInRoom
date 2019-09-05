import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductsDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';

const ShopNaviagtor = createStackNavigator({
    Products: ProductsOverviewScreen,
    ProductsDetails: ProductsDetailsScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.Primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(ShopNaviagtor);
