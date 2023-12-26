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
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

type Props = {
  info: any;
  index: number;
  totalCards: number;
  activeIndex: SharedValue<number>;
};
const {width} = Dimensions.get('screen');

export const cardWidth = width * 0.75;

const SwipeCard = ({info, index, totalCards, activeIndex}: Props) => {
  const {navigate} = useNavigation();
  const numberOfCardToDisplay = 3;
  const translateX = useSharedValue(0);

  const animatedCardStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / numberOfCardToDisplay, 1, 1],
    );
    const scale = interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [0.95, 1, 1],
    );
    const translateY = interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [-20, 0, 0],
    );
    const rotateZ = `${interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-15, 0, 15],
    )}deg`;
    return {
      opacity,
      transform: [
        {scale},
        {translateY},
        {translateX: translateX.value},
        {rotateZ},
      ],
    };
  });

  function log(type: string) {
    return (event: any) => {
      console.log(type);
      console.log(event);
    };
  }
  const gesture = Gesture.Pan()
    // .enabled(activeIndex.value !== index)
    .onChange(event => {
      translateX.value = event.translationX;
      activeIndex.value = interpolate(
        Math.abs(translateX.value),
        [0, 500],
        [0, activeIndex.value + 0.8],
      );
    })
    .onEnd(event => {
      if (Math.abs(event.velocityX) > 400) {
        translateX.value = withSpring(Math.sign(event.velocityX) * 500, {
          velocity: event.velocityX,
        });
        activeIndex.value = withSpring(index + 1);
      } else {
        translateX.value = withSpring(0);
      }
    });

  return (
    // <TouchableOpacity
    //   // @ts-ignore
    //   onPress={() => navigate(Navigation.PROFILE_MODAL)}
    //   className="absolute h-[450px] z-[2] flex-1 justify-end rounded-2xl w-full max-w-[295px] ">
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.card, animatedCardStyle, {zIndex: totalCards - index}]}
        className="rounded-2xl">
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
      </Animated.View>
    </GestureDetector>
    // </TouchableOpacity>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    aspectRatio: 1 / 1.5,
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  image: {},
  info: {
    padding: 15,
  },
});
