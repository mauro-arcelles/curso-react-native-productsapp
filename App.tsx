import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductContext';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;

