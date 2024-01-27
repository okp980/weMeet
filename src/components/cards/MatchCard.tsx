import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText/CustomText';
import Svg from '../../constants/svg';
import {MeetRequestResponse} from '../../types/meet';
import {useUpdateMeetRequestMutation} from '../../services/modules/meet-request';
import {showMessage} from 'react-native-flash-message';

const MatchCard = ({creator, id}: MeetRequestResponse) => {
  console.log('creator: ' + JSON.stringify(creator));
  const [updateMeet] = useUpdateMeetRequestMutation();

  const handleUpdateMeet = async (status: 'accepted' | 'rejected') => {
    try {
      await updateMeet({id, status}).unwrap();
    } catch (error) {
      showMessage({
        type: 'danger',
        message: `Error occurred while ${status.slice(0, -2)}ing request`,
      });
    }
  };

  return (
    <View className="w-[45%] m-3 rounded-2xl h-52 bg-orange-200">
      <FastImage
        source={{uri: creator?.profile?.image}}
        className="rounded-2xl"
        style={{height: '100%', width: '100%'}}
      />
      <View className="absolute bottom-0 w-full z-10">
        <View className="px-3 py-1">
          <CustomText as="h3" color="white">
            {creator?.profile?.firstName}, {creator?.profile?.age}
          </CustomText>
        </View>
        <View className="flex-row h-10 w-full">
          <TouchableOpacity
            className="flex-1 items-center justify-center bg-red-200 rounded-bl-2xl"
            onPress={() => handleUpdateMeet('rejected')}>
            <Svg.Times width={20} height={20} fill={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center justify-center bg-blue-200 rounded-br-2xl"
            onPress={() => handleUpdateMeet('accepted')}>
            <Svg.Heart width={20} height={20} fill={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute top-0 bottom-0 left-0 right-0 bg-black rounded-2xl opacity-30" />
    </View>
  );
};

export default MatchCard;
