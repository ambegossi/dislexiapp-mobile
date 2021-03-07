import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardPage from '../pages/Dashboard';
import Profile from '../pages/Profile';
import WordNamingInstructions from '../pages/WordNamingInstructions';

const Dashboard = createStackNavigator();

const DashboardRoutes = () => (
  <Dashboard.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#212765' },
    }}
  >
    <Dashboard.Screen name="Dashboard" component={DashboardPage} />
    <Dashboard.Screen name="Profile" component={Profile} />
    <Dashboard.Screen
      name="WordNamingInstructions"
      component={WordNamingInstructions}
    />
  </Dashboard.Navigator>
);

export default DashboardRoutes;
