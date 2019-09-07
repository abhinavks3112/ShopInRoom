import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { useScreens } from 'react-native-screens';
import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './store/reducers/productsReducer';
import cartReducer from './store/reducers/cartReducer';
import ordersReducer from './store/reducers/ordersReducer';
import ShopNaviagtor from './navigation/ShopNavigator';

useScreens(true);

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartReducer,
  orders: ordersReducer
});

/* composeWithDevTools should be removed when deploying the app since
this is only useful for debugging with Redux Native Debugger Tool */
const store = createStore(rootReducer, composeWithDevTools());

// Load custom fonts to be used anywhere in this app
const fetchFonts = () => Font.loadAsync({
    roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
});

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  /* If font has'nt been loaded, then display splash screen */
  if (!isFontLoaded) {
    return (
      <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setIsFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNaviagtor />
    </Provider>
  );
}
