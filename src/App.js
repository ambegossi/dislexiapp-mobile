import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#212765" />
    <View
      style={{
        flex: 1,
        backgroundColor: '#212765',
      }}
    >
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
