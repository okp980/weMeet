import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Share from 'react-native-share';
import InAppReview from 'react-native-in-app-review';

import {
  CustomText,
  Layout,
  NotificationToggle,
  ProfileItem,
  ThemeToggle,
} from '../../components';
import FastImage from 'react-native-fast-image';
import {Svg, Navigation} from '../../constants';

type Props = {};

const Profile = ({navigation}: any) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity className="mr-4">
          <CustomText as="regular" className="font-bold">
            Sign Out
          </CustomText>
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleShare = async () => {
    try {
      await Share.open({
        title: 'weMeet',
        message: 'Checkout weMeet chat',
        url: 'https://wemeet.page.link',
      });
    } catch (error) {
      console.log('error with sharing app', error);
    }
  };

  const handleRateApp = () => {
    // This package is only available on android version >= 21 and iOS >= 10.3

    // Give you result if version of device supported to rate app or not!
    InAppReview.isAvailable();

    // trigger UI InAppreview
    InAppReview.RequestInAppReview()
      .then(hasFlowFinishedSuccessfully => {
        // when return true in android it means user finished or close review flow
        console.log('InAppReview in android', hasFlowFinishedSuccessfully);

        // when return true in ios it means review flow lanuched to user.
        console.log(
          'InAppReview in ios has launched successfully',
          hasFlowFinishedSuccessfully,
        );

        // 1- you have option to do something ex: (navigate Home page) (in android).
        // 2- you have option to do something,
        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

        // 3- another option:
        if (hasFlowFinishedSuccessfully) {
          // do something for ios
          // do something for android
        }

        // for android:
        // The flow has finished. The API does not indicate whether the user
        // reviewed or not, or even whether the review dialog was shown. Thus, no
        // matter the result, we continue our app flow.

        // for ios
        // the flow lanuched successfully, The API does not indicate whether the user
        // reviewed or not, or he/she closed flow yet as android, Thus, no
        // matter the result, we continue our app flow.
      })
      .catch(error => {
        //we continue our app flow.
        // we have some error could happen while lanuching InAppReview,
        // Check table for errors and code number that can return in catch.
        console.log(error);
      });
  };

  return (
    <Layout>
      <View className="flex-row items-center gap-4 mb-8 pt-2">
        <View className="relative w-24 h-24 rounded-full">
          <FastImage
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            className="w-24 h-24 rounded-full"
          />
          <TouchableOpacity>
            <View className="bg-primary h-9 w-9 rounded-full justify-center items-center border border-white absolute right-[-5px] bottom-[-5px]">
              <Svg.Camera />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <CustomText as="h3">Emmanuel Okpunor</CustomText>
          <CustomText as="medium">
            <Text style={{fontWeight: '800'}}>22</Text> Meets
          </CustomText>
        </View>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ProfileItem
          title="Edit Profile"
          icon={
            <View className="rounded bg-primary px-2 py-1">
              <Svg.Person fill={'white'} width={16} />
            </View>
          }
          handlePress={() => {}}
        />
        <ThemeToggle />
        <NotificationToggle />
        <View className="mt-4 border-t border-b py-4 border-gray-300">
          <ProfileItem
            title="Terms and conditions"
            icon={
              <View className="rounded bg-primary px-2 py-1">
                <Svg.Home fill={'white'} width={16} />
              </View>
            }
            handlePress={() => {
              navigation.navigate(Navigation.WEB_SCREEN, {
                url: 'https://okp980.github.io/weMeet/terms_and_condition',
              });
            }}
          />
          <View className="my-2" />
          <ProfileItem
            title="Privacy policy"
            icon={
              <View className="rounded bg-primary px-2 py-1">
                <Svg.Info fill={'white'} width={18} />
              </View>
            }
            handlePress={() => {
              navigation.navigate(Navigation.WEB_SCREEN, {
                url: 'https://okp980.github.io/weMeet/policy',
              });
            }}
          />
          <View className="my-2" />
          <ProfileItem
            title="Share with friends"
            icon={
              <View className="rounded bg-primary px-2 py-1">
                <Svg.Share fill={'white'} width={16} />
              </View>
            }
            showCaret={false}
            handlePress={handleShare}
          />
          <View className="my-2" />
          <ProfileItem
            title="Rate app"
            icon={
              <View className="rounded bg-primary px-2 ">
                <Svg.Star fill={'white'} width={16} />
              </View>
            }
            showCaret={false}
            handlePress={handleRateApp}
          />
        </View>
        <CustomText as="regular" className="text-center my-4">
          Version 0.1.1
        </CustomText>
      </ScrollView>
    </Layout>
  );
};

export default Profile;
