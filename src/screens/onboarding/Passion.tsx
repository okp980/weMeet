import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Button, Layout} from '../../components';
import {interests} from '../../helpers/data';

type Props = {};

const Passion = (props: Props) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleSelectInterest = (interest: string) => {
    const hasInterest = selectedInterests.includes(interest);
    if (hasInterest) {
      const newInterests = selectedInterests.filter(item => item !== interest);
      setSelectedInterests(newInterests);
      return;
    }
    setSelectedInterests(prev => [...prev, interest]);
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
      <View className="flex-1 ">
        <FlatList
          className="my-4 flex-1"
          data={interests}
          renderItem={({item: {Icon, interest}}) => (
            <Button
              className="flex-1 mx-auto m-1 px-1"
              textStyle={'text-sm '}
              variant={
                selectedInterests.includes(interest) ? 'primary' : 'outline'
              }
              startIcon={
                <Icon
                  fill={
                    selectedInterests.includes(interest) ? '#fff' : '#E94057'
                  }
                />
              }
              onPress={() => handleSelectInterest(interest)}>
              {interest}
            </Button>
          )}
          keyExtractor={({interest}, index) => interest + index}
          numColumns={2}
        />
      </View>
      <Button variant="primary" className="mx-auto">
        Continue
      </Button>
    </Layout>
  );
};

export default Passion;
