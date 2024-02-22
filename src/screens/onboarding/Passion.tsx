import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Button, CustomText, Layout, PassionList} from '../../components';
import {usePassionMutation} from '../../services/modules/onboarding';
import {showMessage} from 'react-native-flash-message';
import {Navigation} from '../../constants';
import {useAuth} from '../../hooks';

type Props = any;

const Passion = ({navigation}: Props) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [updatePassion, {isLoading}] = usePassionMutation();
  const {compeleteProfileOnboarding} = useAuth();

  const onSubmit = async () => {
    if (selectedInterests.length === 0) {
      showMessage({
        type: 'danger',
        message: 'Please add at least one interest',
      });
      return;
    }
    try {
      await updatePassion({passion: selectedInterests}).unwrap();
      compeleteProfileOnboarding();
      console.log('success');

      navigation.navigate(Navigation.TAB_NAVIGATION, {
        path: Navigation.HOME_SCREEN,
      });
    } catch (error: any) {
      showMessage({
        type: 'danger',
        message:
          'data' in error ? error?.data?.message : 'Error updating profile',
      });
    }
  };

  return (
    <Layout className="justify-between p-5">
      <View>
        <CustomText as="large">Your interests</CustomText>
        <CustomText as="regular">
          Select a few of your interests and let everyone know what you’re
          passionate about.
        </CustomText>
      </View>
      <PassionList
        selectedInterests={selectedInterests}
        onSelectInterests={setSelectedInterests}
      />
      <Button variant="primary" loading={isLoading} onPress={onSubmit}>
        Continue
      </Button>
    </Layout>
  );
};

export default Passion;
