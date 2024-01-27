import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText/CustomText';
import {MeetRequestResponse} from '../../types/meet';

type Props = {
  meet: MeetRequestResponse;
  userId: number;
  openMessage: () => void;
};

const ActivityCard = ({userId, meet, openMessage}: Props) => {
  const user = userId !== meet.recipient.id ? meet.recipient : meet.creator;

  return (
    <TouchableOpacity className="items-center gap-1" onPress={openMessage}>
      <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
        <FastImage
          source={{uri: user?.profile?.image}}
          className="h-[60px] w-[60px] rounded-full border border-white"
        />
      </View>
      <CustomText as="small">{user?.profile?.firstName}</CustomText>
    </TouchableOpacity>
  );
};

export default ActivityCard;
