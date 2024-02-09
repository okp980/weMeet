import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {forwardRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Svg from '../../constants/svg';
import SwipeCard, {cardHeight, cardWidth} from '../cards/SwipeCard';
import {dummyCards} from '../../helpers/data';
import Swiper, {SwiperProps} from 'react-native-deck-swiper';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../constants';
import {User} from '../../types/auth';

type Ref = Swiper<any>;
type Props = {} & SwiperProps<any>;

const {width} = Dimensions.get('screen');

const CustomSwiper = forwardRef<Ref, Props>((props, ref) => {
  const navigation = useNavigation();
  return (
    <Swiper
      ref={ref}
      stackSize={2}
      verticalSwipe={false}
      // infinite={true}
      stackSeparation={-20}
      cardHorizontalMargin={(width - 40 - cardWidth) / 2}
      cardVerticalMargin={10}
      disableTopSwipe
      onTapCard={props => {
        console.log('well');
        // @ts-ignore
        navigation.navigate(Navigation.PROFILE_MODAL);
      }}
      disableBottomSwipe
      outputRotationRange={['-20deg', '0deg', '20deg']}
      containerStyle={{
        backgroundColor: 'transparent',
        alignItems: 'center',
      }}
      backgroundColor="transparent"
      cardStyle={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: 16,
      }}
      overlayLabels={{
        left: {
          element: (
            <LinearGradient
              colors={['transparent', '#E9405775']}
              className="rounded-2xl w-full flex-1 items-center justify-center">
              <View
                className="h-20 w-20  rounded-full items-center justify-center"
                style={styles.shadow}>
                <Svg.Times fill={'#6657a9'} />
              </View>
            </LinearGradient>
          ),
          title: 'Cancel',
          style: {
            wrapper: {
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
        },
        right: {
          element: (
            <LinearGradient
              colors={['transparent', '#E9405775']}
              className="rounded-2xl w-full flex-1 items-center justify-center">
              <View
                className="h-20 w-20  rounded-full items-center justify-center"
                style={styles.shadow}>
                <Svg.Heart fill={'#6657a9'} width={30} height={30} />
              </View>
            </LinearGradient>
          ),
          title: 'Accept',
          style: {
            wrapper: {
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
        },
      }}
      {...props}
    />
  );
});

export default CustomSwiper;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    elevation: 3,
    backgroundColor: 'white',
  },
});
