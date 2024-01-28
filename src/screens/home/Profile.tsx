import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {CustomText, Layout, ProfileItem} from '../../components';
import FastImage from 'react-native-fast-image';
import {Svg, Navigation} from '../../constants';

type Props = {};

const Profile = (props: Props) => {
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
      <ScrollView className="flex-1 ">
        <ProfileItem
          title="Edit Profile"
          icon={<Svg.Person fill={'white'} width={16} />}
          to={Navigation.EDIT_PROFILE_SCREEN}
        />
      </ScrollView>
    </Layout>
  );
};

export default Profile;
