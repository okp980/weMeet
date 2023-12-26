import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../customText/CustomText';
import FastImage from 'react-native-fast-image';

type Props = {
  info: any;
};
const {width, height} = Dimensions.get('screen');

export const cardWidth = width * 0.75;
export const cardHeight = height * 0.5;

const SwipeCard = ({info}: Props) => {
  return (
    // <TouchableOpacity
    //   // @ts-ignore
    //   onPress={() => navigate(Navigation.PROFILE_MODAL)}
    //   className="absolute h-[450px] z-[2] flex-1 justify-end rounded-2xl w-full max-w-[295px] ">

    <View style={[styles.card]} className="rounded-2xl">
      <FastImage
        source={{uri: info.image}}
        style={[styles.image, StyleSheet.absoluteFillObject]}
        className="rounded-2xl"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.75)']}
        style={[StyleSheet.absoluteFillObject, {top: '50%'}]}
        className="rounded-2xl"
      />
      <View style={styles.info}>
        <CustomText as="h2" color="white">
          {info.name}, {info.age}
        </CustomText>
      </View>
    </View>

    // </TouchableOpacity>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    // aspectRatio: 1 / 1.5,
    justifyContent: 'flex-end',
  },
  image: {},
  info: {
    padding: 15,
  },
});
