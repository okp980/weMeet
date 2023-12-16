import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {Svg} from '../../constants';
import FastImage from 'react-native-fast-image';

type Props = {};

const Gallery = ({navigation}: any) => {
  return (
    <View className="flex-1  bg-white">
      <View className="justify-center h-[125px] pl-7">
        <TouchableOpacity
          className="border border-gray-200 rounded-2xl h-12 w-14 justify-center items-center"
          onPress={navigation.goBack}>
          <Svg.LeftCaret fill={'#fff'} />
        </TouchableOpacity>
      </View>
      <FastImage
        source={{
          uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        }}
        className="flex-1 "
      />
      <View className="h-[125px]  justify-center items-center">
        <View className="w-[80%] h-full">
          <FlatList
            data={['', '', '', '', '']}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            renderItem={() => (
              <TouchableOpacity className="border border-gray-200 rounded-2xl h-12 w-14 justify-center items-center">
                <FastImage
                  source={{
                    uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  }}
                  className=" h-16 w-16 rounded"
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View className="w-4" />}
            horizontal
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Gallery;
