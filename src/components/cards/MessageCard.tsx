import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText/CustomText';
import {IChat} from '../../types/chat';

type Props = {
  item: IChat;
  openMessage: () => void;
};

const MessageCard = ({item, openMessage}: Props) => {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-2"
      onPress={openMessage}>
      <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
        <FastImage
          source={{uri: item?.recipient?.profile?.image}}
          className="h-[60px] w-[60px] rounded-full border border-white"
        />
      </View>
      <View className="border-b border-[#E8E6EA] flex-row flex-1 py-2">
        <View className="flex-1 justify-between">
          <CustomText as="h3">{item?.recipient?.profile?.firstName}</CustomText>
          <CustomText as="small">{item?.messages[0]?.content}</CustomText>
        </View>
        <View />
        <View className="justify-between items-end">
          {/* TODO: come back to this */}
          {/* <CustomText as="small">23 min</CustomText>
          <View className="h-5 w-5 rounded-full bg-primary items-center justify-center">
            <CustomText as="small" className="font-semibold" color="white">
              1
            </CustomText>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
