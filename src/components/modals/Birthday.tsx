import {View, Text} from 'react-native';
import React, {forwardRef} from 'react';
import CustomBottomSheetModal from '../customBottomSheetModal/CustomBottomSheetModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Calendar} from 'react-native-calendars';
import {format, getMonth} from 'date-fns';

type Props = {
  onChange: (data: string) => void;
};
type Ref = BottomSheetModal;

const Birthday = forwardRef<Ref, Props>(({onChange}, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} points={['70%']}>
      <>
        <Text className="mb-2 text-center text-sm">Birthday</Text>
        <Calendar
          onDayPress={day => onChange(day.dateString)}
          theme={{
            arrowColor: '#000000',
            dayTextColor: '#000000',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#E94057',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#E94057',
          }}
          renderHeader={date => (
            <View>
              <Text className="text-center font-semibold text-4xl text-primary">
                {format(new Date(date), 'yyyy')}
              </Text>
              <Text className="text-center text-primary">
                {format(new Date(date), 'MMMM')}
              </Text>
            </View>
          )}
        />
      </>
    </CustomBottomSheetModal>
  );
});

export default Birthday;
