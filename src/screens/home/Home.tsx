import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {CustomText, Filter, HomeHeader, Layout} from '../../components';
import Svg from '../../constants/svg';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const Home = ({navigation}: any) => {
  const bottomRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader ref={bottomRef} />,
    });
  }, []);

  return (
    <Layout className="gap-2">
      <View className="flex-1 items-center relative">
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileModal')}
          className="flex-1 justify-end rounded-2xl w-full max-w-[295px] p-5">
          <View className="z-20">
            <CustomText as="h1" color="white">
              Jessica Parker, 23
            </CustomText>
            <CustomText as="small" color="white">
              Professional Model
            </CustomText>
          </View>
          <View className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl opacity-25 bg-gray-900" />
        </TouchableOpacity>
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
