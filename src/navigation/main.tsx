import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFlipper} from '@react-navigation/devtools';
import AuthNavigation from './auth/Auth';
import {useAuth} from '../hooks';
import {Navigation} from '../constants';
import HomeNavigation from './home/HomeNavigation';

const Stack = createNativeStackNavigator();

const Main = () => {
  const navigationRef = useNavigationContainerRef();
  const {token} = useAuth();
  useFlipper(navigationRef);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} />
        <Stack.Navigator
          initialRouteName={
            token ? Navigation.HOME_NAVIGATION : Navigation.AUTH_NAVIGATION
          }
          screenOptions={{headerShown: false}}>
          {token ? (
            <Stack.Screen
              name={Navigation.HOME_NAVIGATION}
              component={HomeNavigation}
            />
          ) : (
            <Stack.Screen
              name={Navigation.AUTH_NAVIGATION}
              component={AuthNavigation}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Main;
