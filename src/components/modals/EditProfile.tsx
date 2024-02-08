import {View} from 'react-native';
import React, {forwardRef, useEffect} from 'react';
import {BottomSheetModal, useBottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../customBottomSheetModal/CustomBottomSheetModal';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../services/modules/auth';
import {Controller, useForm} from 'react-hook-form';
import CustomInput from '../customInput/CustomInput';
import Button from '../button/Button';
import {showMessage} from 'react-native-flash-message';

type Props = {
  type: 'name' | 'bio';
};
type Ref = BottomSheetModal;

type FormValues = {
  fullName: string;
  bio: string;
};
const EditProfile = forwardRef<Ref, Props>(({type}, ref) => {
  const {data, isSuccess, error, isError} = useGetProfileQuery();
  const [update, {isLoading: isLoadingSubmit}] = useUpdateProfileMutation();
  const {dismiss} = useBottomSheetModal();
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      bio: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        fullName: data.name || '',
        bio: data.bio || '',
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
  }, [isSuccess, data, isError, error]);

  const onSubmit = async (data: FormValues) => {
    let payload: any = {name: data.fullName};
    if (type === 'bio') {
      payload = {bio: data?.bio};
    }
    try {
      await update(payload).unwrap();
      if (type === 'bio') {
        showMessage({
          message: 'Update bio successfully',
          type: 'success',
        });
      }
    } catch (error: any) {
      showMessage({
        message: `Error updating ${type}`,
        type: 'danger',
      });

      console.log(error);
    } finally {
      dismiss();
    }
  };
  return (
    <CustomBottomSheetModal ref={ref} points={['40%']}>
      <View className="flex-1">
        {type === 'name' && (
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
        )}
        {type === 'bio' && (
          <Controller
            control={control}
            name="bio"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                label="Bio"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.bio}
                placeholder="Enter bio..."
                multiline
                className="h-16"
              />
            )}
          />
        )}
        <Button
          variant="primary"
          className="mx-auto w-full mt-5"
          loading={isLoadingSubmit}
          onPress={handleSubmit(onSubmit)}>
          {`Update ${type}`}
        </Button>
      </View>
    </CustomBottomSheetModal>
  );
});

export default EditProfile;
