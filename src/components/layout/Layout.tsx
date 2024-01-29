import {View, Text, StyleProp, ViewStyle, ViewProps} from 'react-native';
import React from 'react';
import {styled} from 'nativewind';
import {useCustomTheme} from '../../hooks';

type Props = {
  style?: StyleProp<ViewStyle>;
} & ViewProps;

const Layout = ({style, children, ...props}: Props) => {
  const {color} = useCustomTheme();
  return (
    <View
      style={[style, {backgroundColor: color.colors.background}]}
      className="flex-1 px-5"
      {...props}>
      {children}
    </View>
  );
};

export default styled(Layout, {
  props: {
    style: true,
  },
});
