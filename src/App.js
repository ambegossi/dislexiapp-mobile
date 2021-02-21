import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#212765" />
    <AppProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: '#212765',
        }}
      >
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
