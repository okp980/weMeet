import {View, Text} from 'react-native';
import React, {useCallback, useState} from 'react';
import RangeSlider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';
import CustomText from '../customText/CustomText';

type Props = {
  title: string;
  format: (min: number, max: number) => string;
  min: number;
  max: number;
};

const CustomRangeSlider = ({title, min, max, format}: Props) => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const renderThumb = useCallback(() => <Thumb name="high" />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: string) => <Label text={value} />,
    [],
  );
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low: number, high: number) => {
    setLow(low);
    setHigh(high);
  }, []);
  return (
    <View className="mb-5">
      <View className="flex-row items-center justify-between mb-1">
        <CustomText as="h3">{title}</CustomText>
        <CustomText as="medium">{format(low, high)}</CustomText>
      </View>
      <RangeSlider
        // style={styles.slider}
        min={min}
        max={max}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // @ts-ignore
        // renderLabel={renderLabel}
        // renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

export default CustomRangeSlider;
