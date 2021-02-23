import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardPage from '../pages/Dashboard';
import Profile from '../pages/Profile';

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
  </Dashboard.Navigator>
);

export default DashboardRoutes;
