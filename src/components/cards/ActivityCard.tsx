import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText/CustomText';
import {MeetRequestResponse} from '../../types/meet';
import socket from '../../services/socket';

type Props = {
  meet: MeetRequestResponse;
  userId: number;
  openMessage: () => void;
};

const ActivityCard = ({meet, openMessage}: Props) => {
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    const onActiveStatus = (activeUser: any) => {
      console.log('active user', activeUser);
      if (activeUser.id === meet.id) {
        setIsOnline(activeUser.isActive);
      }
    };
    socket.on('isActive', onActiveStatus);
    return () => {
      socket.off('isActive', onActiveStatus);
    };
  }, [socket]);
  return (
    <TouchableOpacity className="items-center gap-1" onPress={openMessage}>
      <View className="h-16 w-16 rounded-full bg-primary items-center justify-center relative">
        <FastImage
          source={{uri: meet?.profile?.image}}
          className="h-[60px] w-[60px] rounded-full border border-white"
        />
        {isOnline && (
          <View className="absolute h-4 w-4 right-1 bottom-0 rounded-full bg-green-700 border-2 border-white" />
        )}
      </View>
      <CustomText as="small">{meet?.profile?.firstName}</CustomText>
    </TouchableOpacity>
  );
};

export default ActivityCard;
