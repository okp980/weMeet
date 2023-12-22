import React from 'react';
import {GalleryModal, PhotoModal, ProfileModal} from '../../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation} from '../../constants';
import ProfileOnboardingNavigation from '../profile-onboarding/ProfileOnboardingNavigation';
import TabNavigation from '../tab/TabNavigation';
import {useAuth} from '../../hooks';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const {hasOnboardedProfile} = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={
        hasOnboardedProfile
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
