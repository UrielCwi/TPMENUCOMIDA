import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import BusquedaPlatosScreen from './views/BusquedaPlatosScreen';
import DetallePlatoScreen from './views/DetallePlatosScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BusquedaPlatos" component={BusquedaPlatosScreen} />
        <Stack.Screen name="DetallePlato" component={DetallePlatoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
