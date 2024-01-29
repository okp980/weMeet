import React, {ReactElement} from 'react';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../customText/CustomText';
import {Svg} from '../../constants';
import {useCustomTheme} from '../../hooks';

type Props = {
  icon: ReactElement;
  title: string;
  showCaret?: boolean;
  handlePress: () => void;
};

const ProfileItem = ({icon, title, handlePress, showCaret = true}: Props) => {
  const {
    color: {colors},
  } = useCustomTheme();
  return (
    <TouchableOpacity
      className="flex-row gap-4  items-center"
      onPress={handlePress}>
      {icon}
      <View className="flex-1">
        <CustomText as="regular">{title}</CustomText>
      </View>
      {showCaret && <Svg.RightCaret stroke={colors.text} />}
    </TouchableOpacity>
  );
};

export default ProfileItem;
