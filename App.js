import React from 'react';
import Router from './src/Router/Router';
import { NavigationContainer } from '@react-navigation/native';
import { ProductProvider } from './src/contexts/product';

export default function App() {
  return (
    <NavigationContainer>
      <ProductProvider>
        <Router/>
      </ProductProvider>
    </NavigationContainer>
  );
}

