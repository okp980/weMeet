import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomTabBar, CustomText} from '../../components';
import {Navigation} from '../../constants';
import {Chat, Home, Match, Profile} from '../../screens';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={Navigation.HOME_SCREEN}
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
        name={Navigation.HOME_SCREEN}
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
        name={Navigation.MATCH_SCREEN}
        component={Match}
        options={{headerTitle: 'Matches'}}
      />
      <Tab.Screen
        name={Navigation.CHAT_SCREEN}
        component={Chat}
        options={{headerTitle: 'Chats'}}
      />
      <Tab.Screen
        name={Navigation.PROFILE_SCREEN}
        component={Profile}
        options={{headerTitle: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
