import {View, StyleSheet} from 'react-native';
import React, {ReactElement, forwardRef, useCallback, useMemo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

type Props = {
  points: string[];
  children: ReactElement;
} & BottomSheetModalProps;
type Ref = BottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref, Props>(
  ({points, children, ...props}, ref) => {
    const snapPoints = useMemo(() => points, []);
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        {...props}>
        <View className="p-5 flex-1">{children}</View>
      </BottomSheetModal>
    );
  },
);

export default CustomBottomSheetModal;
