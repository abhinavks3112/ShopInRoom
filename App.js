import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

// Load custom fonts to be used anywhere in this app
const fetchFonts = () => {
  Font.loadAsync({
    // eslint-disable-next-line global-require
    roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    // eslint-disable-next-line global-require
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  /* If font has'nt been loaded, then display splash screen */
  if (!isFontLoaded) {
    return (
      <AppLoading
      startAsync={fetchFonts}
      onFinish={setIsFontLoaded(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
