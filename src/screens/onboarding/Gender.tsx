import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Button, Layout} from '../../components';
import Svg from '../../constants/svg';

type Props = {};

const Gender = (props: Props) => {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  return (
    <Layout className="justify-between px-10">
      <Text className="font-bold text-3xl">I am a</Text>
      <View>
        <Button
          variant={gender === 'male' ? 'primary' : 'outline'}
          className="mx-auto mb-7"
          endIcon={gender === 'male' ? <Svg.WhiteCheck /> : <Svg.DarkCheck />}
          onPress={() => setGender('male')}>
          Male
        </Button>
        <Button
          variant={gender === 'female' ? 'primary' : 'outline'}
          className="mx-auto w-full"
          endIcon={gender === 'female' ? <Svg.WhiteCheck /> : <Svg.DarkCheck />}
          onPress={() => setGender('female')}>
          Female
        </Button>
      </View>
      <Button variant="primary" className="mx-auto">
        Continue
      </Button>
    </Layout>
  );
};

export default Gender;
