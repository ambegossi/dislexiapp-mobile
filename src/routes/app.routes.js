import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Ranking from './ranking.routes';
import Dashboard from './dashboard.routes';
import Settings from './settings.routes';

const App = createBottomTabNavigator();

const AppRoutes = () => {
  const tabBarHeight = Platform.OS === 'android' ? 65 : 70;

  return (
    <App.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Ranking') {
            iconName = 'award';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={34} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#be1fd3',
        inactiveTintColor: '#161a48',
        keyboardHidesTabBar: true,
        showLabel: false,
        tabStyle: {
          height: tabBarHeight,
        },
        style: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderTopWidth: 0,
          position: 'absolute',
          height: tabBarHeight,
        },
      }}
      initialRouteName="Dashboard"
    >
      <App.Screen name="Ranking" component={Ranking} />
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="Settings" component={Settings} />
    </App.Navigator>
  );
};

export default AppRoutes;
