import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Filter, Layout, SwipeCard} from '../../components';
import Svg from '../../constants/svg';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAuth} from '../../hooks';
import {useUsersQuery} from '../../services/modules/user';
import {dummyCards} from '../../helpers/data';
import {useSharedValue, withDecay, withSpring} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const Home = ({navigation}: any) => {
  const bottomRef = useRef<BottomSheetModal>(null);
  const {removeAuth} = useAuth();
  const {data: users, isLoading} = useUsersQuery({limit: 10, page: 1});
  const activeIndex = useSharedValue(0);

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
      <View className="flex-1 items-center ">
        {dummyCards.map((card, index) => (
          <SwipeCard
            info={card}
            key={index}
            totalCards={dummyCards.length}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </View>

      <View className="h-28 flex-row items-center justify-around">
        <TouchableOpacity
          className="h-20 w-20  rounded-full items-center justify-center"
          style={styles.shadow}>
          <Svg.Times />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-24 w-24 rounded-full items-center justify-center"
          style={[
            styles.shadow,
            {
              backgroundColor: '#E94057',
              shadowColor: '#E94057',
              shadowRadius: 10,
              shadowOpacity: 0.25,
            },
          ]}>
          <Svg.Heart />
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
});
