import React, {useEffect} from 'react';
import {GalleryModal, PhotoModal, ProfileModal, WebScreen} from '../../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation, Svg} from '../../constants';
import ProfileOnboardingNavigation from '../profile-onboarding/ProfileOnboardingNavigation';
import TabNavigation from '../tab/TabNavigation';
import {useAuth} from '../../hooks';
import {useGetProfileQuery} from '../../services/modules/auth';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../components';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const {hasOnboardedProfile, compeleteProfileOnboarding} = useAuth();
  const {data: profile, isLoading, isSuccess} = useGetProfileQuery();

  useEffect(() => {
    if (profile && profile?.profile?.passion && !hasOnboardedProfile) {
      compeleteProfileOnboarding();
    }
  }, [isSuccess, profile]);

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={'large'} color={'#6657a9'} />
      </View>
    );

  return (
    <Stack.Navigator
      initialRouteName={
        profile?.profile?.passion || hasOnboardedProfile
          ? Navigation.TAB_NAVIGATION
          : Navigation.PROFILE_ONBOARDING_NAVIGATION
      }
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Navigation.PROFILE_ONBOARDING_NAVIGATION}
        component={ProfileOnboardingNavigation}
      />
      <Stack.Screen
        name={Navigation.TAB_NAVIGATION}
        component={TabNavigation}
      />
      <Stack.Screen
        name={Navigation.WEB_SCREEN}
        component={WebScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerShadowVisible: false,
          // headerTintColor: '#6657a9',
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerLeft: ({tintColor}) => (
            <TouchableOpacity onPress={navigation.goBack}>
              <Svg.LeftCaret fill={tintColor} width={20} height={18} />
            </TouchableOpacity>
          ),
          headerBackTitleVisible: false,
          headerTitle: () => <CustomText as="h2">weMeet</CustomText>,
        })}
      />
      <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
        <Stack.Screen
          name={Navigation.PROFILE_MODAL}
          component={ProfileModal}
        />
        <Stack.Screen
          name={Navigation.GALLERY_MODAL}
          component={GalleryModal}
        />
        <Stack.Screen name={Navigation.PHOTO_MODAL} component={PhotoModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNavigation;
