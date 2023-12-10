import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import {Button, CustomBottomSheetModal, Layout} from '../../components';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

type Props = {};

const BioData = (props: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return (
    <Layout>
      <Text>BioData</Text>
      <Button
        variant="primary"
        onPress={() => bottomSheetModalRef.current?.present()}>
        Open Modal
      </Button>
      <CustomBottomSheetModal ref={bottomSheetModalRef} points={['70%']}>
        <Text>BioData</Text>
      </CustomBottomSheetModal>
    </Layout>
  );
};

export default BioData;
