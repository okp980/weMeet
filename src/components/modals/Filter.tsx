import {View, Text} from 'react-native';
import React, {forwardRef, useState} from 'react';
import CustomBottomSheetModal from '../customBottomSheetModal/CustomBottomSheetModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import CustomText from '../customText/CustomText';
import Button from '../button/Button';
import clsx from 'clsx';
import CustomSlider from '../customSlider/CustomSlider';
import CustomRangeSlider from '../customRangeSlider/CustomRangeSlider';

type Props = {};
type Ref = BottomSheetModal;

const Filter = forwardRef<Ref, Props>((props, ref) => {
  const [gender, setGender] = useState<'male' | 'female' | 'both'>('male');

  const formatDistance = (value: string) => `${value}km`;
  const formatAgeRange = (min: number, max: number) => `${min}-${max}`;
  return (
    <CustomBottomSheetModal ref={ref} points={['80%']}>
      <View className="flex-1">
        <View className="flex-row items-center justify-center relative ">
          <CustomText as="h1">Filter</CustomText>
          <Button
            variant="text"
            textStyle="font-medium text-primary"
            btnStyle="absolute top-1/3 right-4">
            Clear
          </Button>
        </View>
        <View className="flex-1">
          <CustomText as="h3" className="mt-10 mb-5">
            Interested in
          </CustomText>
          <View className="rounded-2xl border border-[#E8E6EA] flex-row mb-5">
            <Button
              onPress={() => setGender('female')}
              variant="text"
              btnStyle={clsx(
                'flex-1 h-14 justify-center rounded-tl-2xl rounded-bl-2xl',
                {
                  ['bg-primary']: gender === 'female',
                },
              )}
              textStyle={clsx('text-center', {
                ['text-white']: gender === 'female',
              })}>
              Girls
            </Button>
            <Button
              onPress={() => setGender('male')}
              variant="text"
              btnStyle={clsx('flex-1 h-14 justify-center ', {
                ['bg-primary']: gender === 'male',
              })}
              textStyle={clsx('text-center', {
                ['text-white']: gender === 'male',
              })}>
              Boys
            </Button>
            <Button
              onPress={() => setGender('both')}
              variant="text"
              btnStyle={clsx(
                'flex-1 h-14 justify-center rounded-tr-2xl rounded-br-2xl',
                {
                  ['bg-primary']: gender === 'both',
                },
              )}
              textStyle={clsx('text-center', {
                ['text-white']: gender === 'both',
              })}>
              Both
            </Button>
          </View>

          <CustomSlider
            title="Distance"
            format={formatDistance}
            minimumValue={1}
            maximumValue={100}
          />
          <CustomRangeSlider
            title="Age"
            format={formatAgeRange}
            min={18}
            max={100}
          />
        </View>
        <View className="py-2">
          <Button variant="primary" className="mx-auto">
            Continue
          </Button>
        </View>
      </View>
    </CustomBottomSheetModal>
  );
});

export default Filter;
