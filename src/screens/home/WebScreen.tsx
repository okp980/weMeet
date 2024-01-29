import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Layout} from '../../components';
import {WebView} from 'react-native-webview';

type Props = {};

const WebScreen = ({route}: any) => {
  const {params} = route;

  return (
    <Layout className="p-0">
      <WebView
        source={{uri: params?.url}}
        style={{flex: 1}}
        renderLoading={() => (
          <View style={{flex: 1}}>
            <ActivityIndicator size="large" />
          </View>
        )}
        startInLoadingState={true}
      />
    </Layout>
  );
};

export default WebScreen;
