import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverview from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';

const ShopNaviagtor = createStackNavigator({
    Products: ProductsOverview
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.Primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(ShopNaviagtor);
