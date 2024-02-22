import React from 'react';
import {OnboardFlow, DashDotPagination} from 'react-native-onboard';
import {slides} from '../../helpers/data';
import {useAuth, useCustomTheme} from '../../hooks';
import {Navigation} from '../../constants';

const Welcome = ({navigation}: any) => {
  const {welcome} = useAuth();
  const {
    color: {colors},
  } = useCustomTheme();

  const handleDone = () => {
    welcome();
    navigation.navigate(Navigation.SIGN_IN_SCREEN);
  };
  return (
    <OnboardFlow
      PaginationComponent={props => <DashDotPagination {...props} />}
      pages={slides}
      type={'fullscreen'}
      primaryButtonStyle={{backgroundColor: '#E94057'}}
      paginationSelectedColor="#E94057"
      style={{backgroundColor: colors.background}}
      titleStyle={{
        fontWeight: '600',
        fontSize: 24,
        fontFamily: 'NotoSans-Bold',
        color: colors.text,
      }}
      subtitleStyle={{
        fontWeight: '400',
        fontSize: 16,
        fontFamily: 'NotoSans-Regular',
        color: colors.text,
      }}
      onDone={handleDone}
    />
  );
};

export default Welcome;
