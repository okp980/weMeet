import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

export const selectPermission = (type: string): any => {
  return Platform.select({
    ios: type === 'camera' ? PERMISSIONS.IOS.CAMERA : null,
    android: type === 'camera' ? PERMISSIONS.ANDROID.CAMERA : null,
  });
};

export const requestPermission = async (permission: string) => {
  const result = await request(selectPermission(permission));
  switch (result) {
    case RESULTS.BLOCKED:
      throw new Error(
        "Cannot use camera, if you want Pine to use your camera, you'd have to granted this permission manually in the settings",
      );
    case RESULTS.GRANTED:
      return result;

    default:
      return null;
  }
};

export const checkPermission = async (permission: string) => {
  const result = await check(selectPermission(permission));
  switch (result) {
    case RESULTS.UNAVAILABLE:
      throw new Error('This feature is not available on this device');

    case RESULTS.DENIED:
      return await requestPermission(permission);

    case RESULTS.GRANTED:
      return result;
    case RESULTS.BLOCKED:
      throw new Error(
        "Cannot use camera, if you want weMeet to use your camera, you'd have to grant this permission manually in the settings",
      );
    default:
      return null;
  }
};

export const getTwoDimensionalArray = <T>(singleArray: T[]): T[][] => {
  return singleArray.reduce((prev: T[][], curr: T) => {
    if (prev.length > 1) {
      const lastIndex = prev.length - 1;
      const lastItem = prev[lastIndex];

      if (lastItem.length === 2) {
        return [...prev, [curr]];
      }

      prev[lastIndex] = [...lastItem, curr];
      return prev;
    }

    return [[curr]];
  }, []);
};

export const androidNotificationPermission = async () => {
  return await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
};

export const iosNotificationPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission({
    providesAppNotificationSettings: true,
  });
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

export const getFCMToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  return await messaging().getToken();
};
