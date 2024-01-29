import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {
  CustomText,
  Layout,
  NotificationToggle,
  ProfileItem,
  ThemeToggle,
} from '../../components';
import FastImage from 'react-native-fast-image';
import {Svg, Navigation} from '../../constants';
import Share from 'react-native-share';

type Props = {};

const Profile = ({navigation}: any) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity className="mr-4">
          <CustomText as="regular" color="#E94057" className="font-bold">
            Sign Out
          </CustomText>
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleShare = async () => {
    try {
      const shareResponse = await Share.open({
        title: 'weMeet',
        message: 'Checkout weMeet chat',
        url: 'https://wemeet.page.link',
      });
    } catch (error) {
      console.log('error with sharing app', error);
    }
  };

  return (
    <Layout>
      <View className="flex-row items-center gap-4 mb-8">
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
            handlePress={() => {}}
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
