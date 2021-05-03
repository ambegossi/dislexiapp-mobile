import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RankingPage from '../pages/Ranking';

const Ranking = createStackNavigator();

const RankingRoutes = () => (
  <Ranking.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#212765' },
    }}
  >
    <Ranking.Screen name="Ranking" component={RankingPage} />
  </Ranking.Navigator>
);

export default RankingRoutes;
