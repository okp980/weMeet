import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {Svg} from '../../constants';
import {useSignInWithSocialMutation} from '../../services/modules/auth';
import {SocialProvider} from '../../types/auth';
import {useAuth} from '../../hooks';

const {Apple, Facebook, Google, Logo} = Svg;

const SignIn = () => {
  const [signInWithSocial, {isLoading}] = useSignInWithSocialMutation();
  const {authenticateUser, removeAuth} = useAuth();
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const response = await signInWithSocial({
        token: userInfo.idToken!,
        provider: SocialProvider.GOOGLE,
      }).unwrap();
      authenticateUser(response.access_token);
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
      removeAuth();
    } catch (error) {
      console.error(error);
    }
  };

  // signOut();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <View className="flex-1 px-10 items-center">
      <View className="flex-[.7] justify-center items-center w-full">
        <Logo width={108} height={100} />
      </View>
      <View className="flex-[.3] w-full">
        <View className="flex-row items-center justify-between">
          <View className="h-[2px] w-1/3 bg-gray-200" />
          <Text className="text-gray-800 text-base font-noto">
            Sign up with
          </Text>
          <View className="h-[2px] w-1/3 bg-gray-200" />
        </View>
        <View className="flex-row justify-around mt-8">
          <TouchableOpacity className="rounded-2xl border border-gray-200 p-4">
            <Facebook width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signIn}
            className="rounded-2xl border border-gray-200 p-4">
            <Google width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-2xl border border-gray-200 p-4">
            <Apple width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
