import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import Button from '../button/Button';
import {interests} from '../../helpers/data';

type Props = {
  selectedInterests: string[];
  onSelectInterests: React.Dispatch<React.SetStateAction<string[]>>;
};

const PassionList = ({selectedInterests, onSelectInterests}: Props) => {
  const handleSelectInterest = (interest: string) => {
    const hasInterest = selectedInterests.includes(interest);
    if (hasInterest) {
      const newInterests = selectedInterests.filter(item => item !== interest);
      onSelectInterests(newInterests);
      return;
    }
    onSelectInterests(prev => [...prev, interest]);
  };

  return (
    <View className="flex-1">
      <FlatList
        className="my-4 flex-1"
        data={interests}
        renderItem={({item: {Icon, interest}}) => (
          <Button
            className="flex-1 m-1 px-1"
            textStyle={'text-sm '}
            variant={
              selectedInterests.includes(interest) ? 'primary' : 'outline'
            }
            startIcon={
              <Icon
                fill={selectedInterests.includes(interest) ? '#fff' : '#E94057'}
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
  );
};

export default PassionList;
