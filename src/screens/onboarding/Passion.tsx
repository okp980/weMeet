import {View, Text} from 'react-native';
import React from 'react';
import {Button, Layout} from '../../components';

type Props = {};

const Passion = (props: Props) => {
  return (
    <Layout className="justify-between px-10">
      <View>
        <Text className="font-bold text-3xl mb-2">Your interests</Text>
        <Text className="text-black font-light">
          Select a few of your interests and let everyone know what you’re
          passionate about.
        </Text>
      </View>
      <View>
        <Button variant="primary" className="mx-auto mb-7">
          Continue
        </Button>
        <Button variant="primary" className="mx-auto">
          Continue
        </Button>
      </View>
      <Button variant="primary" className="mx-auto">
        Continue
      </Button>
    </Layout>
  );
};

export default Passion;
