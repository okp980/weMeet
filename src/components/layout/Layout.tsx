import {View, Text, StyleProp, ViewStyle, ViewProps} from 'react-native';
import React from 'react';
import {styled} from 'nativewind';

type Props = {
  style?: StyleProp<ViewStyle>;
} & ViewProps;

const Layout = ({style, children, ...props}: Props) => {
  return (
    <View style={style} className="flex-1 p-5 bg-white" {...props}>
      {children}
    </View>
  );
};

export default styled(Layout, {
  props: {
    style: true,
  },
});
