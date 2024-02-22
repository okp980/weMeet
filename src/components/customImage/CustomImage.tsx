import {View, Text, ImageProps} from 'react-native';
import React from 'react';
import FastImage, {
  FastImageProps,
  FastImageStaticProperties,
} from 'react-native-fast-image';

type Props = any;

const CustomImage = ({source, ...restProps}: Props) => {
  return (
    <FastImage
      source={
        source?.uri
          ? {uri: source?.uri}
          : require('../../assets/imgs/user_placeholder.png')
      }
      {...restProps}
      className="w-28 h-28 rounded-2xl"
    />
  );
};

export default CustomImage;
