import {Text, TextProps} from 'react-native';
import React from 'react';
import clsx from 'clsx';
import {styled} from 'nativewind';
import {useCustomTheme} from '../../hooks';

type HeaderAs = 'large' | 'h1' | 'h2' | 'h3';
type Body = 'big' | 'small' | 'medium' | 'regular' | 'tiny';

type Props = {
  as: HeaderAs | Body;
  color?: string;
} & TextProps;

const heading = {
  large: 'font-bold text-3xl mb-1',
  h1: 'font-bold text-2xl mb-1',
  h2: 'font-semibold text-xl mb-1',
  h3: 'font-semibold text-lg mb-1',
};

const body = {
  big: 'font-regular text-lg',
  regular: 'font-regular text-base',
  medium: 'font-regular text-sm',
  small: 'font-regular text-xs',
  tiny: 'font-regular text-[10px]',
};

const CustomText = ({style, as, color, children}: Props) => {
  const {
    color: {colors},
  } = useCustomTheme();
  const customClass = {
    [heading.large]: as === 'large',
    [heading.h1]: as === 'h1',
    [heading.h2]: as === 'h2',
    [heading.h3]: as === 'h3',
    [body.big]: as === 'big',
    [body.regular]: as === 'regular',
    [body.medium]: as === 'medium',
    [body.small]: as === 'small',
    [body.tiny]: as === 'tiny',
  };
  return (
    <Text
      style={[style, {color: color ?? colors.text}]}
      className={clsx(customClass)}>
      {children}
    </Text>
  );
};

export default styled(CustomText, {
  props: {
    style: true,
  },
});
