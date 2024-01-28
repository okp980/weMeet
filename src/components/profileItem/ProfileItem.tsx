import React, {ReactElement} from 'react';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../customText/CustomText';
import {Svg} from '../../constants';

type Props = {
  icon: ReactElement;
  title: string;
  to: string;
};

const ProfileItem = ({icon, title, to}: Props) => {
  return (
    <TouchableOpacity className="flex-row gap-4  items-center">
      <View className="rounded bg-primary px-1">{icon}</View>
      <View className="flex-1">
        <CustomText as="regular">{title}</CustomText>
      </View>
      <Svg.RightCaret />
    </TouchableOpacity>
  );
};

export default ProfileItem;
