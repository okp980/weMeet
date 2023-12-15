import {View, Text, TouchableOpacity} from 'react-native';
import React, {forwardRef, useRef} from 'react';
import {Svg} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import clsx from 'clsx';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomText from '../customText/CustomText';

type Props = {};
type Ref = BottomSheetModal;

const HomeHeader = forwardRef<Ref, Props>((props, ref) => {
  const navigation = useNavigation();

  const openFilter = () => {
    // @ts-ignore
    ref?.current?.present();
  };
  return (
    <>
      <View
        className={clsx(
          'h-16 bg-white px-4 flex-row items-center justify-between',
        )}>
        <TouchableOpacity className="border border-gray-200 rounded-2xl h-12 w-14 justify-center items-center">
          <Svg.LeftCaret />
        </TouchableOpacity>
        <View className="flex-1">
          <CustomText as="h1" className="text-center">
            Discover
          </CustomText>
          <CustomText as="tiny" className="text-center">
            Chicago,ll
          </CustomText>
        </View>
        <TouchableOpacity
          className="border border-gray-200 rounded-2xl h-12 w-14 justify-center items-center"
          onPress={openFilter}>
          <Svg.Filter />
        </TouchableOpacity>
      </View>
    </>
  );
});

export default HomeHeader;
