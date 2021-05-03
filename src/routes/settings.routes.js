import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsPage from '../pages/Settings';

const Settings = createStackNavigator();

const SettingsRoutes = () => (
  <Settings.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#212765' },
    }}
  >
    <Settings.Screen name="Settings" component={SettingsPage} />
  </Settings.Navigator>
);

export default SettingsRoutes;
