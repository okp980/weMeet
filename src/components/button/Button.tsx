import {
  Text,
  TouchableOpacity,
  TextProps,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {ReactElement} from 'react';
import clsx from 'clsx';
import {styled} from 'nativewind';
import {useCustomTheme} from '../../hooks';

type Props = {
  textStyle?: TextProps;
  btnStyle?: StyleProp<ViewStyle>;
  variant: 'primary' | 'outline' | 'accent' | 'text';
  loading?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
} & TouchableOpacityProps;

const btnRoot = 'rounded-2xl py-3 px-4';
const textRoot = 'text-gray-800 text-base font-medium';

const Button = ({
  textStyle,
  btnStyle,
  variant,
  startIcon,
  endIcon,
  children,
  loading,
  ...props
}: Props) => {
  const {
    color: {colors},
    theme,
  } = useCustomTheme();
  const btnClass = clsx(btnRoot, {
    ['bg-primary w-full']: variant === 'primary',
    ['bg-transparent border border-gray-200 w-full']: variant === 'outline',
    ['bg-[#fdecef] w-full']: variant === 'accent',
  });
  const textClass = clsx(textRoot, {
    ['text-[#ffffff]']: variant === 'outline' && theme === 'dark',
    ['text-black']: variant === 'outline' && theme === 'light',
    ['text-white']: variant === 'primary',
    ['text-primary']: variant === 'accent',
    ['text-center']: !startIcon && !endIcon,
  });
  if (loading) {
    return (
      <TouchableOpacity
        style={btnStyle}
        className={btnClass}
        disabled={loading}
        {...props}>
        <ActivityIndicator size={'small'} color={'white'} />
      </TouchableOpacity>
    );
  }
  if (variant === 'text') {
    return (
      <TouchableOpacity {...props} style={btnStyle}>
        <Text style={[textStyle, {color: colors.text}]}>{children}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={btnStyle} {...props} className={btnClass}>
      <View
        className={clsx('flex-row w-full item-center justify-center gap-4')}>
        {startIcon && startIcon}
        {/* <View className={clsx('flex-1 items-center')}> */}
        <Text style={[textStyle]} className={textClass}>
          {children}
        </Text>
        {/* </View> */}
        {endIcon && endIcon}
      </View>
    </TouchableOpacity>
  );
};

export default styled(Button, {
  props: {
    btnStyle: true,
    textStyle: true,
  },
});
