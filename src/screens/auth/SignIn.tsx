import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {Svg} from '../../constants';

const {Apple, Facebook, Google, Logo} = Svg;

const SignIn = () => {
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
            // gap: 8,
            // justifyContent: 'space-between',
          }}
          className=" justify-between">
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
  );
};

export default SignIn;

const styles = StyleSheet.create({
  line: {
    height: 2,
    width: '33%',
    backgroundColor: '#E8E6EA',
  },
});
