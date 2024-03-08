import React from 'react';
import Router from './src/Router/Router';
import { NavigationContainer } from '@react-navigation/native';
import { ProductProvider } from './src/contexts/product';
import { StyleSheet, View } from 'react-native';
import { cssColors } from './src/Variavel/Css';

export default function App() {
  return (
    <NavigationContainer>
      <ProductProvider>
        <View style={styles.container}>
          <Router />
        </View>
      </ProductProvider>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: cssColors.background,
    marginTop: 40,
    paddingBottom: 5,
  },

})
