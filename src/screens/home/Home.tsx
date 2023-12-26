import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {CustomSwiper, Filter, Layout, SwipeCard} from '../../components';
import Svg from '../../constants/svg';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAuth} from '../../hooks';
import {useUsersQuery} from '../../services/modules/user';
import {dummyCards} from '../../helpers/data';
import Swiper from 'react-native-deck-swiper';

const Home = ({navigation}: any) => {
  const bottomRef = useRef<BottomSheetModal>(null);
  const swiperRef = useRef<Swiper<any>>(null);
  const {removeAuth} = useAuth();
  const {data: users, isLoading} = useUsersQuery({limit: 10, page: 1});

  const openFilter = () => {
    bottomRef?.current?.present();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="mr-4">
          <TouchableOpacity
            className="border border-gray-200 rounded-2xl h-12 w-14 justify-center items-center"
            onPress={openFilter}>
            <Svg.Filter />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const signOut = async () => {
    try {
      const signout = await GoogleSignin.signOut();
      console.log(signout);
      console.log('ssigned out');
      removeAuth();
    } catch (error) {
      console.error(error);
    }
  };

  // signOut();

  return (
    <Layout className="gap-2">
      <View className="flex-1">
        <CustomSwiper
          cards={dummyCards}
          renderCard={card => <SwipeCard info={card} />}
          ref={swiperRef}
        />
      </View>

      <View className="h-28 flex-row items-center justify-around">
        <TouchableOpacity
          className="h-20 w-20  rounded-full items-center justify-center"
          style={styles.shadow}
          onPress={() => swiperRef.current?.swipeLeft()}>
          <Svg.Times fill={'#F27121'} />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-24 w-24 rounded-full items-center justify-center"
          style={[styles.shadow, styles.likeBtn]}
          onPress={() => swiperRef.current?.swipeRight()}>
          <Svg.Heart fill={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-20 w-20 rounded-full items-center justify-center"
          style={styles.shadow}>
          <Svg.Star />
        </TouchableOpacity>
      </View>
      <Filter ref={bottomRef} />
    </Layout>
  );
};

export default Home;

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
  likeBtn: {
    backgroundColor: '#E94057',
  },
});
