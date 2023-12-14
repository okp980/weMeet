import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../button/Button';
import Svg from '../../constants/svg';
import clsx from 'clsx';

type Props = {
  next: 'Gender' | 'Passion' | 'Notification' | 'Home';
};

export const OnboardHeaderWithOutGoBack = ({next}: Props) => {
  const navigation = useNavigation();
  return (
    <View
      className={clsx('h-14 bg-white  px-4 flex-row items-center justify-end')}>
      <TouchableOpacity
        onPress={() =>
          next === 'Home'
            ? // @ts-ignore
              navigation.navigate('HomeNavigation', {path: 'Home'})
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

      <TouchableOpacity
        onPress={() =>
          next === 'Home'
            ? // @ts-ignore
              navigation.navigate('HomeNavigation', {screen: 'Home'})
            : // @ts-ignore
              navigation.navigate(next)
        }>
        <Text className="text-primary text-base font-medium">skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardHeader;
