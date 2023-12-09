import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BioData, Gender, Passion, Notification} from '../../screens';
import {Button, OnboardHeader} from '../../components';
import {OnboardHeaderWithOutGoBack} from '../../components/onboardHeader/OnboardHeader';

const Stack = createNativeStackNavigator();

const OnboardingNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="BioData">
      <Stack.Screen
        name="BioData"
        component={BioData}
        options={{
          header: () => <OnboardHeaderWithOutGoBack next="Gender" />,
        }}
      />
      <Stack.Screen
        name="Gender"
        component={Gender}
        options={{
          header: () => <OnboardHeader next="Passion" />,
        }}
      />
      <Stack.Screen
        name="Passion"
        component={Passion}
        options={{
          header: () => <OnboardHeader next="Notification" />,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          header: () => <OnboardHeader next="Home" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigation;
