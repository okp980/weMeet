import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Slider, {SliderProps} from '@react-native-community/slider';
import CustomText from '../customText/CustomText';

type Props = {
  title: string;
  format: (value: string) => string;
} & SliderProps;

const CustomSlider = ({title, format, ...props}: Props) => {
  const [currentValue, setCurrentValue] = useState('1');
  return (
    <View className="mb-5">
      <View className="flex-row items-center justify-between">
        <CustomText as="h3">{title}</CustomText>
        <CustomText as="medium">{format(currentValue)}</CustomText>
      </View>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#E94057"
        maximumTrackTintColor="#E8E6EA"
        onValueChange={value => setCurrentValue(value.toString())}
        thumbTintColor="#E94057"
        step={1}
        {...props}
      />
    </View>
  );
};

export default CustomSlider;
