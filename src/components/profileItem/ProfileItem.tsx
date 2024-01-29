import React, {ReactElement} from 'react';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../customText/CustomText';
import {Svg} from '../../constants';

type Props = {
  icon: ReactElement;
  title: string;
  showCaret?: boolean;
  handlePress: () => void;
};

const ProfileItem = ({icon, title, handlePress, showCaret = true}: Props) => {
  return (
    <TouchableOpacity
      className="flex-row gap-4  items-center"
      onPress={() => handlePress}>
      {icon}
      <View className="flex-1">
        <CustomText as="regular">{title}</CustomText>
      </View>
      {showCaret && <Svg.RightCaret />}
    </TouchableOpacity>
  );
};

export default ProfileItem;
