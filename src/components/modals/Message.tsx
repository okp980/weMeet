import {View, Text} from 'react-native';
import React, {forwardRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../customBottomSheetModal/CustomBottomSheetModal';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText/CustomText';
import CustomChat from '../customChat/CustomChat';
type Props = {
  // onChat: (message: string) => void;
  friendId: number | null;
};
type Ref = BottomSheetModal;

const Message = forwardRef<Ref, Props>(({friendId}, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} points={['90%']}>
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
            <FastImage
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              className="h-[60px] w-[60px] rounded-full border border-white"
            />
          </View>
          <View className="flex-1 py-2">
            <CustomText as="h3">Joy</CustomText>
            <View className="flex-row items-center gap-1">
              <View className="h-[7px] w-[7px] rounded-full bg-[#E94057]" />
              <CustomText as="small" color="gray">
                Online
              </CustomText>
            </View>
          </View>
        </View>
        <CustomChat friendId={friendId} />
      </View>
    </CustomBottomSheetModal>
  );
});

export default Message;
