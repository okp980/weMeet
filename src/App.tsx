/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Logo from '../assets/svgs/trademark.svg';
import Facebook from '../assets/svgs/facebook.svg';
import Apple from '../assets/svgs/apple.svg';
import Google from '../assets/svgs/google.svg';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '445986193855-bcb87d7m354vgd03h59a942umt8m4c19.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: 'WeMeet', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '445986193855-kvt8luph79s3esfut87ati153nilqdtg.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('cancelled', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('in progress', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('not available', error);
      } else {
        // some other error happened
        console.log('wild card', error);
      }
    }
  };

  const signOut = async () => {
    try {
      const signout = await GoogleSignin.signOut();
      console.log(signout);
      console.log('ssigned out');

      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  // signOut();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 40,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Logo width={108} height={100} />
        </View>
        <View style={{flex: 0.3, width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              justifyContent: 'space-between',
            }}>
            <View style={styles.line} />
            <Text>sign up with</Text>
            <View style={styles.line} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#E8E6EA',
                padding: 16,
              }}>
              <Facebook width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signIn}
              style={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#E8E6EA',
                padding: 16,
              }}>
              <Google width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#E8E6EA',
                padding: 16,
              }}>
              <Apple width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 2,
    width: '33%',
    backgroundColor: '#E8E6EA',
  },
});

export default App;

/*
ios client id 445986193855-kvt8luph79s3esfut87ati153nilqdtg.apps.googleusercontent.com

*/
