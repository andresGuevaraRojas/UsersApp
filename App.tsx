import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import Config from 'react-native-config';

console.log(Config.API_URL);

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
