import 'react-native-gesture-handler';

import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import FlashMessage from 'react-native-flash-message';

import {store, persistor} from './store';

import Main from './navigation/main';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from '@env';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  androidClientId: GOOGLE_ANDROID_CLIENT_ID,
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <Main />
            <FlashMessage position="top" />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
