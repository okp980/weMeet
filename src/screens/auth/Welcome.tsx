import React from 'react';
import {OnboardFlow} from 'react-native-onboard';
import {slides} from '../../helpers/data';
import {useAuth} from '../../hooks';
import {Navigation} from '../../constants';

const Welcome = ({navigation}: any) => {
  const {welcome} = useAuth();

  const handleDone = () => {
    welcome();
    navigation.navigate(Navigation.SIGN_IN_SCREEN);
  };
  return (
    <OnboardFlow
      pages={slides}
      type={'fullscreen'}
      primaryButtonStyle={{backgroundColor: '#E94057'}}
      paginationSelectedColor="#E94057"
      titleStyle={{
        fontWeight: '600',
        fontSize: 24,
        fontFamily: 'NotoSans-Bold',
      }}
      subtitleStyle={{
        fontWeight: '400',
        fontSize: 16,
        fontFamily: 'NotoSans-Regular',
      }}
      onDone={handleDone}
    />
  );
};

export default Welcome;
