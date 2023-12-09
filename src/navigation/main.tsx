import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn} from '../screens';
import {useFlipper} from '@react-navigation/devtools';

const Stack = createNativeStackNavigator();

const Main = () => {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);
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
