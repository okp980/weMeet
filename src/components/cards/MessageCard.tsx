import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText/CustomText';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item: any;
};

const MessageCard = ({item}: Props) => {
  return (
    <TouchableOpacity className="flex-row items-center gap-1">
      <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
        <FastImage
          source={{uri: item?.image}}
          className="h-[60px] w-[60px] rounded-full border border-white"
        />
      </View>
      <View className="border-b border-[#E8E6EA] flex-row flex-1 py-2">
        <View className="flex-1 justify-between">
          <CustomText as="h3">{item.name}</CustomText>
          <CustomText as="small">Sticker 😍</CustomText>
        </View>
        <View className="justify-between items-end">
          <CustomText as="small">23 min</CustomText>
          <View className="h-5 w-5 rounded-full bg-primary items-center justify-center">
            <CustomText as="small" className="font-semibold" color="white">
              1
            </CustomText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
