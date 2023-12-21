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
import {Svg} from '../../constants';
import FastImage from 'react-native-fast-image';
import {checkPermission} from '../../helpers/utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAuth} from '../../hooks';
import {useGetProfileQuery} from '../../services/modules/auth';
import {useBioDataMutation} from '../../services/modules/onboarding';
import {AWS_S3_LINK} from '@env';

type FormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

const BioData = ({navigation}: any) => {
  const [selectedImageURI, setSelectedImageURI] = useState('');
  const {data: profile, isSuccess, isError, error} = useGetProfileQuery();
  const [updateBioData, {isLoading: isLoadingBiodata}] = useBioDataMutation();
  const {removeAuth} = useAuth();
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.profile.firstName || '',
        lastName: profile.profile.lastName || '',
        dateOfBirth: profile.profile.dateOfBirth || '',
      });
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

  const signOut = async () => {
    try {
      const signout = await GoogleSignin.signOut();
      console.log(signout);
      console.log('ssigned out');
      removeAuth();
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  // signOut();

  const selectImage = async () => {
    try {
      // await checkPermission('camera');
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (response.errorMessage) {
      }
      if (response.assets) {
        // @ts-ignore
        if (response.assets[0].fileSize > 1024 * 1024 * 5) {
          showMessage({
            message: 'Image size cannot exceed 10MB',
            type: 'danger',
          });
        }
        // @ts-ignore
        setSelectedImageURI(response.assets[0].uri);
        // @ts-ignore
        console.log(response.assets);

        // set image uri
      }
    } catch (error: any) {
      if (typeof error === 'string') {
        showMessage({message: error, type: 'danger'});
      }
      console.log(error);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    console.log(data);

    formData.append('image', {
      uri: selectedImageURI,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('dateOfBirth', data.dateOfBirth);
    try {
      await updateBioData(formData).unwrap();
      navigation.navigate('Gender');
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
                : profile?.profile.image
                ? `${AWS_S3_LINK}/${profile?.profile.image}`
                : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            className="w-28 h-28 rounded-2xl"
          />
          <TouchableOpacity onPress={selectImage}>
            <View className="bg-primary h-9 w-9 rounded-full justify-center items-center border border-white absolute right-[-10px] bottom-[-10px]">
              <Svg.Camera />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Controller
            control={control}
            name="firstName"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                label="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.firstName}
                placeholder="John"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                label="Last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.lastName}
                placeholder="Doe"
              />
            )}
          />
          <Controller
            control={control}
            name="dateOfBirth"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                label="Date Of Birth"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.dateOfBirth}
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
