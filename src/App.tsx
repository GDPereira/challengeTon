import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProductsScreen from './pages/products';
import CartScreen from './pages/cart';
import CartProvider from './context/cartContext';

export type RootStackParamList = {
  Products: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Products">
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;
