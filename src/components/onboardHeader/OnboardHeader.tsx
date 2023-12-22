import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../button/Button';
import Svg from '../../constants/svg';
import clsx from 'clsx';
import {Navigation} from '../../constants';
import {useAuth} from '../../hooks';

type Props = {
  next: keyof typeof Navigation;
};

export const OnboardHeaderWithOutGoBack = ({next}: Props) => {
  const navigation = useNavigation();
  return (
    <View
      className={clsx('h-14 bg-white  px-4 flex-row items-center justify-end')}>
      <TouchableOpacity
        onPress={() =>
          next === Navigation.HOME_SCREEN
            ? // @ts-ignore
              navigation.navigate(Navigation.TAB_NAVIGATION, {
                path: Navigation.HOME_SCREEN,
              })
            : // @ts-ignore
              navigation.navigate(next)
        }>
        <Text className="text-primary text-base font-medium">skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const OnboardHeader = ({next}: Props) => {
  const navigation = useNavigation();
  const {compeleteProfileOnboarding} = useAuth();
  const onNavigate = (next: string) => {
    if (next === Navigation.HOME_SCREEN) {
      compeleteProfileOnboarding();
      // @ts-ignore
      navigation.navigate(Navigation.TAB_NAVIGATION, {
        screen: Navigation.HOME_SCREEN,
      });
    } else {
      // @ts-ignore
      navigation.navigate(next);
    }
  };
  return (
    <View
      className={clsx(
        'h-16 bg-white px-4 flex-row items-center justify-between',
      )}>
      <TouchableOpacity
        className="border border-gray-200 rounded-2xl h-12 w-14 justify-center items-center"
        onPress={navigation.goBack}>
        <Svg.LeftCaret />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate(next)}>
        <Text className="text-primary text-base font-medium">skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardHeader;
