import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardPage from '../pages/Dashboard';
import Profile from '../pages/Profile';
import NamingInstructions from '../pages/NamingInstructions';
import Naming from '../pages/Naming';
import NamingCompleted from '../pages/NamingCompleted';
import Review from '../pages/Review';

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
      name="NamingInstructions"
      component={NamingInstructions}
    />
    <Dashboard.Screen name="Naming" component={Naming} />
    <Dashboard.Screen name="NamingCompleted" component={NamingCompleted} />
    <Dashboard.Screen name="Review" component={Review} />
  </Dashboard.Navigator>
);

export default DashboardRoutes;
