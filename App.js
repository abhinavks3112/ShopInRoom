import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { useScreens } from 'react-native-screens';

import ShopNaviagtor from './navigation/ShopNavigator';
import configureStore from './store/configureStore';

useScreens(true);

const store = configureStore();

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
