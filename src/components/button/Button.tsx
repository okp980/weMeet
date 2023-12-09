import {
  Text,
  TouchableOpacity,
  TextProps,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import React, {ReactElement} from 'react';
import clsx from 'clsx';
import {styled} from 'nativewind';

type Props = {
  textStyle?: TextProps;
  btnStyle?: StyleProp<ViewStyle>;
  variant: 'primary' | 'outline' | 'accent' | 'text';
  startIcon?: ReactElement;
  endIcon?: ReactElement;
} & TouchableOpacityProps;

const btnRoot = 'rounded-2xl p-4 flex-row item-center justify-between';
const textRoot = 'text-gray-800 text-base font-medium';

const Button = ({
  textStyle,
  btnStyle,
  variant,
  startIcon,
  endIcon,
  children,
  ...props
}: Props) => {
  const btnClass = clsx(
    btnRoot,
    {
      ['bg-primary']: variant === 'primary',
      ['bg-transparent border border-gray-200']: variant === 'outline',
      ['bg-[#fdecef]']: variant === 'accent',
      ['rounded-none']: variant === 'text',
    },
    btnStyle,
  );
  const textClass = clsx(textRoot, {
    ['text-white']: variant === 'primary',
    ['text-primary']: variant === 'accent',
  });
  return (
    <TouchableOpacity style={btnStyle} {...props} className={btnClass}>
      {startIcon && startIcon}
      <Text style={textStyle} className={textClass}>
        {children}
      </Text>
      {endIcon && endIcon}
    </TouchableOpacity>
  );
};

export default styled(Button, {
  props: {
    btnStyle: true,
    textStyle: true,
  },
});
