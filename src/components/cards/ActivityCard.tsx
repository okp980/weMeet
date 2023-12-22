import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText/CustomText';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../constants';

type Props = {
  item: any;
  navigation: any;
};

const ActivityCard = ({item, navigation}: Props) => {
  return (
    <TouchableOpacity
      className="items-center gap-1"
      onPress={() => navigation.navigate(Navigation.PHOTO_MODAL, {user: 1})}>
      <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
        <FastImage
          source={{uri: item?.image}}
          className="h-[60px] w-[60px] rounded-full border border-white"
        />
      </View>
      <CustomText as="small">{item.name}</CustomText>
    </TouchableOpacity>
  );
};

export default ActivityCard;
