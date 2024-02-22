import {View, Text, TextInput, TextInputProps, ViewStyle} from 'react-native';
import React from 'react';
import {FieldError} from 'react-hook-form';
import clsx from 'clsx';
import {useCustomTheme} from '../../hooks';

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
            <Text className="text-gray-400 text-sm">{label}</Text>
          </View>
        )}
        <TextInput {...props} className="p-0" />
      </View>
      {error && (
        <Text className="mt-1 text-red-600 text-xs">{error as string}</Text>
      )}
    </View>
  );
};

export default CustomInput;
