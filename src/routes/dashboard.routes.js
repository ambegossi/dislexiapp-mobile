import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardPage from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Avatar from '../pages/Profile/Avatar';
import NamingInstructions from '../pages/NamingInstructions';
import Naming from '../pages/Naming';
import NamingCompleted from '../pages/NamingCompleted';
import Review from '../pages/Review';
import ReviewCompleted from '../pages/ReviewCompleted';
import NARCompleted from '../pages/NARCompleted';
import RecordAudioPermission from '../pages/RecordAudioPermission';
import Instructions from '../pages/Instructions';

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
    <Dashboard.Screen name="Avatar" component={Avatar} />
    <Dashboard.Screen
      name="NamingInstructions"
      component={NamingInstructions}
    />
    <Dashboard.Screen name="Naming" component={Naming} />
    <Dashboard.Screen name="NamingCompleted" component={NamingCompleted} />
    <Dashboard.Screen name="Review" component={Review} />
    <Dashboard.Screen name="ReviewCompleted" component={ReviewCompleted} />
    <Dashboard.Screen name="NARCompleted" component={NARCompleted} />
    <Dashboard.Screen
      name="RecordAudioPermission"
      component={RecordAudioPermission}
    />
    <Dashboard.Screen name="Instructions" component={Instructions} />
  </Dashboard.Navigator>
);

export default DashboardRoutes;
