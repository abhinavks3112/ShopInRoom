import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductsDetailsScreen from '../screens/shop/ProductDetailsScreen';
import Colors from '../constants/Colors';

const ShopNaviagtor = createStackNavigator({
    Products: ProductsOverviewScreen,
    ProductsDetails: ProductsDetailsScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.Primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(ShopNaviagtor);
