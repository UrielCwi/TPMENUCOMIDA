import React from 'react';
import { ProductProvider } from './context/productContext'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import DetallePlatoScreen from './views/DetallePlatoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="detallePlato" component={DetallePlatoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}
