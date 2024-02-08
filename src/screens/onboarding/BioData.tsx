import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, CustomInput, Form, Layout} from '../../components';
import {Controller, useForm} from 'react-hook-form';
import {Navigation, Svg} from '../../constants';
import FastImage from 'react-native-fast-image';
import {checkPermission, selectImage} from '../../helpers/utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {useGetProfileQuery} from '../../services/modules/auth';
import {useBioDataMutation} from '../../services/modules/onboarding';
import {AWS_S3_LINK} from '@env';

type FormValues = {
  fullName: string;
  age: number;
};

const BioData = ({navigation}: any) => {
  const [selectedImageURI, setSelectedImageURI] = useState('');
  const {data: profile, isSuccess, isError, error} = useGetProfileQuery();
  const [updateBioData, {isLoading: isLoadingBiodata}] = useBioDataMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      age: 18,
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.name || '',
        age: profile.age || 18,
      });
      setSelectedImageURI(`${AWS_S3_LINK}/${profile.image}`);
    }
    if (error) {
      showMessage({
        message:
          'data' in error
            ? error?.data?.message
            : 'Error fetching profile information',
        type: 'danger',
      });
    }
  }, [isSuccess, profile, isError, error]);

  const handleSelectImage = async () => {
    const uri = await selectImage();
    setSelectedImageURI(uri as string);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    console.log('submitting file', selectedImageURI);

    if (selectedImageURI.trim() !== '') {
      formData.append('image', {
        uri: selectedImageURI,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
    }
    formData.append('name', data.fullName);
    formData.append('age', data.age);
    try {
      await updateBioData(formData).unwrap();
      navigation.navigate(Navigation.GENDER_SCREEN);
    } catch (error: any) {
      console.log(error);
      showMessage({
        type: 'danger',
        message:
          'data' in error ? error?.data?.message : 'Error updating details',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Layout className="justify-between px-10">
        <Text className="font-bold text-3xl">Profile details</Text>
        <View className="mx-auto relative w-28 h-28 rounded-2xl">
          <FastImage
            source={{
              uri: selectedImageURI
                ? selectedImageURI
                : profile?.image
                ? `${AWS_S3_LINK}/${profile?.image}`
                : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            className="w-28 h-28 rounded-2xl"
          />
          <TouchableOpacity onPress={handleSelectImage}>
            <View className="bg-primary h-9 w-9 rounded-full justify-center items-center border border-white absolute right-[-10px] bottom-[-10px]">
              <Svg.Camera />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Controller
            control={control}
            name="fullName"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                label="Full name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.fullName}
                placeholder="John Doe"
              />
            )}
          />

          <Controller
            control={control}
            name="age"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                label="Age"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value as unknown as string}
                error={errors.age}
                placeholder="23-01-1984"
              />
            )}
          />
          <Button
            variant="primary"
            className="mx-auto w-full mt-5"
            loading={isLoadingBiodata}
            onPress={handleSubmit(onSubmit)}>
            Confirm
          </Button>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default BioData;
