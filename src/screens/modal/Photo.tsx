import {
  View,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {CustomInput, CustomText, Form} from '../../components';
import {Svg} from '../../constants';
import {Controller} from 'react-hook-form';
import * as Progress from 'react-native-progress';

type Props = any;
type FormValues = {
  message: string;
};

const Photo = ({navigation}: Props) => {
  const {width} = useWindowDimensions();
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }}
      style={{flex: 1, padding: 40, justifyContent: 'space-between'}}>
      <View>
        <Progress.Bar
          progress={0.2}
          width={width - 80}
          color="#E94057"
          height={2}
          borderWidth={0}
          unfilledColor="white"
        />
        <View className="flex-row items-center gap-2 mt-2">
          <FastImage
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            className="h-14 w-14 rounded-full border border-white"
          />

          <View className="flex-1 py-2">
            <CustomText as="h3">Annabelle</CustomText>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="h-10 w-10 border border-white bg-white/20 rounded-xl items-center justify-center">
            <Svg.Close />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Form<FormValues> onSubmit={onSubmit}>
          {({handleSubmit, control, formState: {errors}}) => (
            <View className="flex-row justify-center items-center ">
              <Controller
                control={control}
                name="message"
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.message}
                    placeholder="Enter Message"
                    inputClassName=" border-white bg-white/20"
                    contentContainerClassName="mb-0"
                    placeholderTextColor={'white'}
                    style={{
                      width: width * 0.55,
                    }}
                  />
                )}
              />
              <TouchableOpacity
                onPress={navigation.goBack}
                className="h-10 w-10 border ml-3 border-white bg-white/20 rounded-xl items-center justify-center">
                <Svg.Send height={18} fill={'#fff'} />
              </TouchableOpacity>
            </View>
          )}
        </Form>
      </View>
    </ImageBackground>
  );
};

export default Photo;
