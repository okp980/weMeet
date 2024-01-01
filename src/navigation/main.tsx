import {SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useFlipper} from '@react-navigation/devtools';
import messaging from '@react-native-firebase/messaging';

import AuthNavigation from './auth/Auth';
import {useAuth} from '../hooks';
import {Navigation} from '../constants';
import HomeNavigation from './home/HomeNavigation';
import {
  androidNotificationPermission,
  getFCMToken,
  iosNotificationPermission,
} from '../helpers/utils';

const Stack = createNativeStackNavigator();

const Main = () => {
  const [loading, setLoading] = useState(true);

  const navigationRef = useNavigationContainerRef<any>();

  const {token} = useAuth();
  const [initialRoute, setInitialRoute] = useState(
    token ? Navigation.HOME_NAVIGATION : Navigation.AUTH_NAVIGATION,
  );
  // useFlipper(navigationRef);

  useEffect(() => {
    handlePermissions();
  }, []);

  const handlePermissions = async () => {
    androidNotificationPermission();
    const enabled = await iosNotificationPermission();
    if (enabled) {
      const token = await getFCMToken();
      console.log('FCM Token', token);

      //TODO: save to global state
      //TODO: clear token when user signs out from app and server(remove from db)
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('Onmessage caught this', remoteMessage);
    });
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      switch (remoteMessage.data.type) {
        case Navigation.PROFILE_MODAL:
          navigationRef.navigate(Navigation.HOME_NAVIGATION, {
            screen: Navigation.PROFILE_MODAL,
          });
          break;

        default:
          break;
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type);
        }
        setLoading(false);
      });
    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={'light-content'} />
        <Stack.Navigator
          initialRouteName={initialRoute}
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
