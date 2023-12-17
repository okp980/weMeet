import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Button, CustomInput, Form, Layout} from '../../components';
import {Controller} from 'react-hook-form';
import {Svg} from '../../constants';
import FastImage from 'react-native-fast-image';
import {checkPermission} from '../../helpers/utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAuth} from '../../hooks';

type FormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

const BioData = ({navigation}: any) => {
  const [selectedImageURI, setSelectedImageURI] = useState('');
  const {removeAuth} = useAuth();
  const onSubmit = (data: FormValues) => {
    navigation.navigate('Gender');
  };

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

        // set image uri
      }
    } catch (error: any) {
      if (typeof error === 'string') {
        showMessage({message: error, type: 'danger'});
      }
      console.log(error);
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
        <Form<FormValues> onSubmit={onSubmit}>
          {({handleSubmit, control, formState: {errors}}) => (
            <>
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
                className="mx-auto mt-5"
                onPress={handleSubmit(onSubmit)}>
                Confirm
              </Button>
            </>
          )}
        </Form>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default BioData;
