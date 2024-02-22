import {View, Text, TextInput, TextInputProps, ViewStyle} from 'react-native';
import React from 'react';
import {FieldError} from 'react-hook-form';
import clsx from 'clsx';
import {useCustomTheme} from '../../hooks';
import CustomText from '../customText/CustomText';

type Props = {
  label?: string;
  error?: string | FieldError;
  inputClassName?: string;
  contentContainerClassName?: string;
} & TextInputProps;

const CustomInput = ({
  label,
  error,
  inputClassName,
  contentContainerClassName,
  ...props
}: Props) => {
  const {color} = useCustomTheme();
  return (
    <View className={clsx('mb-5', contentContainerClassName)}>
      <View
        className={clsx(
          'rounded-2xl border border-gray-400  px-3 py-5 relative ',
          inputClassName,
        )}>
        {label && (
          <View
            className="absolute top-[-10px] left-6"
            style={{backgroundColor: color.colors.background}}>
            <CustomText as="small">{label}</CustomText>
          </View>
        )}
        <TextInput
          {...props}
          className="p-0"
          style={{color: color.colors.text, fontSize: 16}}
        />
      </View>
      {error && (
        <CustomText as="tiny" className="mt-1 text-red-600">
          {error as string}
        </CustomText>
      )}
    </View>
  );
};

export default CustomInput;
