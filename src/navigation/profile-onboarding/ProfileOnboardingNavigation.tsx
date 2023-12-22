import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BioData, Gender, Passion} from '../../screens';
import {OnboardHeader} from '../../components';
import {OnboardHeaderWithOutGoBack} from '../../components/onboardHeader/OnboardHeader';
import {Navigation} from '../../constants';

const Stack = createNativeStackNavigator();

const ProfileOnboardingNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={Navigation.BIO_DATA_SCREEN}>
      <Stack.Screen
        name={Navigation.BIO_DATA_SCREEN}
        component={BioData}
        options={{
          header: () => (
            <OnboardHeaderWithOutGoBack next={Navigation.GENDER_SCREEN} />
          ),
        }}
      />
      <Stack.Screen
        name={Navigation.GENDER_SCREEN}
        component={Gender}
        options={{
          header: () => <OnboardHeader next={Navigation.PASSION_SCREEN} />,
        }}
      />
      <Stack.Screen
        name={Navigation.PASSION_SCREEN}
        component={Passion}
        options={{
          header: () => <OnboardHeader next={Navigation.HOME_SCREEN} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileOnboardingNavigation;
