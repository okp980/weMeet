import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {format, isToday, isYesterday} from 'date-fns';
import {
  MatchRequestData,
  MeetRequestResponse,
  MeetResponse,
} from '../types/meet';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

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

export const getMatchTimeline = (date: string) => {
  if (isToday(new Date(date))) {
    return 'today';
  }
  if (isYesterday(new Date(date))) {
    return 'yesterday';
  }

  return format(new Date(date), 'dd-MM-yyyy');
};

export const getMatchData = (data: MeetRequestResponse[]): MatchRequestData => {
  return data.reduce((prev: MatchRequestData, {createdAt, ...curr}) => {
    if (prev.some(item => item.title === getMatchTimeline(createdAt))) {
      const index = prev.findIndex(
        item => item.title === getMatchTimeline(createdAt),
      );
      return [
        ...prev,
        {
          title: prev[index].title,
          data: [...prev[index].data, {createdAt, ...curr}],
        },
      ];
    }
    return [
      ...prev,
      {
        title: getMatchTimeline(createdAt),
        data: [{createdAt, ...curr}],
      },
    ];
  }, []);
};

export const selectImage = async () => {
  try {
    // await checkPermission('camera');
    const response = await launchImageLibrary({mediaType: 'photo'});
    if (response.errorMessage) {
      console.log(response.errorMessage);
    }
    if (response.assets) {
      // @ts-ignore
      if (response.assets[0].fileSize > 1024 * 1024 * 5) {
        showMessage({
          message: 'Image size cannot exceed 10MB',
          type: 'danger',
        });
      }

      if (Platform.OS === 'android') {
        // @ts-ignore
        return response.assets[0].uri;
      }
      // @ts-ignore
      return response.assets[0].uri.replace('file://', '');
    }
  } catch (error: any) {
    console.log(error);
    if (typeof error === 'string') {
      showMessage({message: error, type: 'danger'});
    }
  }
};
