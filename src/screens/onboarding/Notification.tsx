import {View, Text} from 'react-native';
import React from 'react';
import {Button, Layout} from '../../components';
import Svg from '../../constants/svg';

type Props = {};

const Notification = (props: Props) => {
  return (
    <Layout className="justify-between px-10">
      <View className="flex-1">
        <View className="flex-1">
          <Svg.Chat />
        </View>
        <View className="flex-1">
          <Text className="font-medium text-3xl mb-2 text-center">
            Enable notification’s
          </Text>
          <Text className="text-black font-light text-center">
            Get push-notification when you get the match or receive a message.
          </Text>
        </View>
      </View>

      <Button variant="primary" className="mx-auto">
        I want to be notified
      </Button>
    </Layout>
  );
};

export default Notification;
