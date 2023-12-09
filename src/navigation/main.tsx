import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn} from '../screens';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} />
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signin" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Main;
