import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, Welcome} from '../../screens';
import {Navigation} from '../../constants';
import {useAuth} from '../../hooks';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const {hasBeenWelcome} = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={
        hasBeenWelcome ? Navigation.SIGN_IN_SCREEN : Navigation.WELCOME_SCREEN
      }
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Navigation.WELCOME_SCREEN} component={Welcome} />
      <Stack.Screen name={Navigation.SIGN_IN_SCREEN} component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
