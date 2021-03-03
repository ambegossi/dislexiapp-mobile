import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Dashboard from './dashboard.routes';

const App = createBottomTabNavigator();

const AppRoutes = () => (
  <App.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = 'home';
        }

        return <Icon name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#40488b',
      inactiveTintColor: '#161a48',
      keyboardHidesTabBar: true,
      showLabel: false,
      style: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute',
        height: 65,
      },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export default AppRoutes;
