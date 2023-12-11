import {NavigatorScreenParams} from '@react-navigation/native';

export type OnboardingStackParamList = {
  BioData: undefined;
  Gender: undefined;
  Passion: undefined;
  Notification: undefined;
};

export type ApplicationStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};
