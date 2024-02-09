import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomTabBar, CustomText} from '../../components';
import {Navigation, Svg} from '../../constants';
import {Chat, Home, Match, Profile} from '../../screens';
import {useNotification} from '../../hooks';
import {View} from 'react-native';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const {hasMatchRequest} = useNotification();
  return (
    <Tab.Navigator
      initialRouteName={Navigation.HOME_SCREEN}
      screenOptions={({route}) => ({
        tabBarStyle: {height: 70},
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let icon;
          switch ((route.name as string).toLowerCase()) {
            case Navigation.HOME_SCREEN.toLowerCase():
              icon = <Svg.Home fill={focused ? '#6657a9' : '#ADAFBB'} />;
              break;
            case Navigation.MATCH_SCREEN.toLowerCase():
              icon = (
                <View>
                  <Svg.Heart
                    width={23}
                    fill={focused ? '#6657a9' : '#ADAFBB'}
                  />
                  {hasMatchRequest && (
                    <View className="bg-[#6657a9] h-3 w-3 justify-center items-center rounded-full absolute top-[6px] right-[-4px] border border-[#F3F3F3]" />
                  )}
                </View>
              );
              break;
            case Navigation.CHAT_SCREEN.toLowerCase():
              icon = (
                <View>
                  <Svg.Message fill={focused ? '#6657a9' : '#ADAFBB'} />
                  <View className="bg-[#6657a9] h-5 w-5 justify-center items-center rounded-full absolute top-[-8px] right-[-10px] border border-[#F3F3F3]">
                    <CustomText as="tiny" color="white">
                      5
                    </CustomText>
                  </View>
                </View>
              );
              break;
            case Navigation.PROFILE_SCREEN.toLowerCase():
              icon = <Svg.Person fill={focused ? '#6657a9' : '#ADAFBB'} />;
              break;

            default:
              icon = null;
              break;
          }

          return icon;
        },
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        headerStyle: {
          height: 80,
        },
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: '700',
        },
      })}>
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
        options={{
          headerTitle: 'Chats',
        }}
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
