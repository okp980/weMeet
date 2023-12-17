import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Chat, Home, Match, Profile} from '../../screens';
import {CustomTabBar, CustomText} from '../../components';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={CustomTabBar}
      screenOptions={{
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'white',
          height: 80,
        },
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: '700',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <>
              <CustomText as="h1" className="text-3xl">
                Discover
              </CustomText>
              <CustomText as="small">Chicago,ll.</CustomText>
            </>
          ),
        }}
      />
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
