import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn} from '../../screens';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signin" component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
