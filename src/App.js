import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#212765" />
    <View
      style={{
        flex: 1,
        backgroundColor: '#212765',
      }}
    />
  </>
);

export default App;
