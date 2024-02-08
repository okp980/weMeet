import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Button, Layout, PassionList} from '../../components';
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
      navigation.navigate(Navigation.HOME_NAVIGATION, {
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

  const handleSelectInterest = (interests: string[]) => {
    setSelectedInterests(interests);
  };
  return (
    <Layout className="justify-between px-5">
      <View>
        <Text className="font-bold text-3xl mb-2">Your interests</Text>
        <Text className="text-black font-light">
          Select a few of your interests and let everyone know what you’re
          passionate about.
        </Text>
      </View>
      <PassionList onSelectInterests={handleSelectInterest} />
      <Button
        variant="primary"
        className="mx-auto"
        loading={isLoading}
        onPress={onSubmit}>
        Continue
      </Button>
    </Layout>
  );
};

export default Passion;
