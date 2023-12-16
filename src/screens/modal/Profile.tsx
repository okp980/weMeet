import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Svg} from '../../constants';
import {Button, CustomText} from '../../components';
import FastImage from 'react-native-fast-image';

type Props = {};

const interests = ['Travelling', 'Books', 'Music', 'Dancing', 'Modelling'];

const Profile = ({navigation}: any) => {
  return (
    <ScrollView className="bg-white">
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        }}
        resizeMode="cover"
        style={{height: 500}}>
        <View className="pt-10 pl-7">
          <TouchableOpacity
            className="border border-gray-200 rounded-2xl h-12 w-14 justify-center items-center"
            onPress={navigation.goBack}>
            <Svg.LeftCaret fill={'#fff'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View className="relative bg-white rounded-tl-[40px] rounded-tr-[40px] top-[-10%] px-10 pt-20">
        <View className="flex-row justify-between items-center ">
          <View>
            <CustomText as="h2">Jessica Parker, 23</CustomText>
            <CustomText as="small" className="font-light">
              Proffesional model
            </CustomText>
          </View>
          <Button
            variant="outline"
            className="m-0 h-14 w-14"
            startIcon={<Svg.Send />}
          />
        </View>
        <View className="mt-2">
          <CustomText as="h3" className="mb-4">
            Location
          </CustomText>
          <CustomText as="small">Chicago, IL United States</CustomText>
        </View>
        <View className="mt-2">
          <CustomText as="h3" className="mb-4">
            About
          </CustomText>
          <CustomText as="small">
            My name is Jessica Parker and I enjoy meeting new people and finding
            ways to help them have an uplifting experience. I enjoy reading..
          </CustomText>
          <Button
            variant="text"
            btnStyle="mt-2"
            textStyle={'text-primary font-semibold'}>
            Read more
          </Button>
        </View>
        <View className="mt-2">
          <CustomText as="h3" className="mb-4">
            Interests
          </CustomText>
          <View className="flex-row gap-1 flex-wrap justify-center">
            {interests.map((interest, index) => (
              <View key={index} className="w-1/4 border border-[#E8E6EA] p-2">
                <CustomText as="small">{interest}</CustomText>
              </View>
            ))}
          </View>
        </View>
        <View className="mt-2">
          <View className="flex-row justify-between items-center">
            <CustomText as="h3" className="mb-4">
              Gallery
            </CustomText>
            <Button
              onPress={() => navigation.navigate('GalleryModal', {user: '1'})}
              variant="text"
              textStyle="font-semibold text-xs text-primary">
              See all
            </Button>
          </View>
          <View className="flex-row gap-2 flex-wrap justify-center">
            <FastImage
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              className="flex-1 h-[190px] rounded"
            />
            <FastImage
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              className="flex-1 h-[190px] rounded"
            />
          </View>
          <View className="flex-row gap-2 flex-wrap justify-center mt-1">
            <FastImage
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              className="flex-1 h-[122px] rounded"
            />
            <FastImage
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              className="flex-1 h-[122px] rounded"
            />
            <FastImage
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              className="flex-1 h-[122px] rounded"
            />
          </View>
        </View>
        <View className="absolute top-[-50px] left-0 right-0">
          <View className="w-[80%] mx-auto flex-row items-center justify-around ">
            <TouchableOpacity
              className="h-16 w-16  rounded-full items-center justify-center"
              style={styles.shadow}>
              <Svg.Times height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              className="h-24 w-24 rounded-full items-center justify-center"
              style={[
                styles.shadow,
                {
                  backgroundColor: '#E94057',
                  shadowColor: '#E94057',
                  shadowRadius: 10,
                  shadowOpacity: 0.25,
                },
              ]}>
              <Svg.Heart height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              className="h-16 w-16 rounded-full items-center justify-center"
              style={styles.shadow}>
              <Svg.Star height={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    elevation: 3,
    backgroundColor: 'white',
    position: 'relative',
  },
});
