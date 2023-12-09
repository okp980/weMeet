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
          initialRouteName="AuthNavigation"
          screenOptions={{headerShown: false}}>
          {token ? (
            <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
          ) : (
            <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Main;
