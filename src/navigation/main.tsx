import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFlipper} from '@react-navigation/devtools';
import AuthNavigation from './auth/Auth';
import HomeNavigation from './home/HomeNavigation';
import {useAuth} from '../hooks';
import {OnboardStatus} from '../types/auth';
import OnboardingNavigation from './onboarding/OnboardingNavigation';

const Stack = createNativeStackNavigator();

const Main = () => {
  const navigationRef = useNavigationContainerRef();
  const {token, onboard_status} = useAuth();
  useFlipper(navigationRef);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} />
        <Stack.Navigator
          initialRouteName="AuthNavigation"
          screenOptions={{headerShown: false}}>
          {token ? (
            <>
              <Stack.Screen
                name="OnboardingNavigation"
                component={OnboardingNavigation}
              />
              <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
            </>
          ) : (
            <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Main;
