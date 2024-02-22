import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../customText/CustomText';
import DatePicker from 'react-native-date-picker';
import clsx from 'clsx';
import {useCustomTheme} from '../../hooks';
import {
  differenceInYears,
  format,
  intervalToDuration,
  subYears,
} from 'date-fns';

type Props = {
  label: string;
  onChange: (text: number) => void;
};

const CustomPicker = ({label, onChange}: Props) => {
  const {color} = useCustomTheme();

  const [date, setDate] = useState(subYears(new Date(), 18));
  const [open, setOpen] = useState(false);

  const handleConfirm = (date: Date) => {
    const {years} = intervalToDuration({start: date, end: new Date()});
    setOpen(false);
    setDate(date);
    onChange(years!);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TouchableOpacity onPress={() => setOpen(true)}>
      <View
        className={clsx(
          'rounded-2xl border border-gray-400  px-3 py-4 relative',
        )}>
        <CustomText as="regular">{format(date, 'dd-MM-yyyy')}</CustomText>
        <View
          className="absolute top-[-10px] left-6"
          style={{backgroundColor: color.colors.background}}>
          <CustomText as="small">{label}</CustomText>
        </View>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={handleClose}
        maximumDate={subYears(new Date(), 18)}
      />
    </TouchableOpacity>
  );
};

export default CustomPicker;
