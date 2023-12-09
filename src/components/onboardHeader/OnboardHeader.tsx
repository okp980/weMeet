import {View, Text} from 'react-native';
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
      <Button
        variant="text"
        textStyle="text-primary"
        onPress={() =>
          next === 'Home'
            ? // @ts-ignore
              navigation.navigate('HomeNavigation', {path: 'Home'})
            : // @ts-ignore
              navigation.navigate(next)
        }>
        skip
      </Button>
    </View>
  );
};

const OnboardHeader = ({next}: Props) => {
  const navigation = useNavigation();
  return (
    <View
      className={clsx(
        'h-14 bg-white px-4 flex-row items-center justify-between',
      )}>
      <Button
        variant="outline"
        className="px-5"
        startIcon={<Svg.LeftCaret />}
        onPress={navigation.goBack}
      />

      <Button
        variant="text"
        textStyle="text-primary"
        onPress={() =>
          next === 'Home'
            ? // @ts-ignore
              navigation.navigate('HomeNavigation', {path: 'Home'})
            : // @ts-ignore
              navigation.navigate(next)
        }>
        skip
      </Button>
    </View>
  );
};

export default OnboardHeader;
