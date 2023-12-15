import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Chat, Home, Match, Profile} from '../../screens';
import {CustomTabBar, HomeHeader} from '../../components';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={CustomTabBar}
      screenOptions={{
        headerStatusBarHeight: 30,
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        // headerStyle: {
        //   backgroundColor: 'red',
        // },
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: '700',
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Match"
        component={Match}
        options={{headerTitle: 'Matches'}}
      />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
