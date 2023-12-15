import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  ActivityCard,
  CustomInput,
  CustomText,
  Form,
  Layout,
  MessageCard,
} from '../../components';
import {Controller} from 'react-hook-form';
import {matches} from '../../helpers/data';

type Props = {};

type FormValues = {
  search: string;
};

const Chat = (props: Props) => {
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Layout>
      <Form<FormValues> onSubmit={onSubmit}>
        {({handleSubmit, control, formState: {errors}}) => (
          <Controller
            control={control}
            name="search"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.search}
                placeholder="Search Message"
              />
            )}
          />
        )}
      </Form>
      <CustomText as="h3">Activities</CustomText>
      <FlatList
        className="my-1 h-28"
        data={matches[0].data}
        renderItem={ActivityCard}
        keyExtractor={(item, index) => item.name + index}
        ItemSeparatorComponent={() => <View className="mr-4" />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <CustomText as="h3">Messages</CustomText>
      <FlatList
        className="my-2"
        data={matches[0].data}
        renderItem={MessageCard}
        keyExtractor={(item, index) => item.name + index}
        ItemSeparatorComponent={() => <View className="mb-2" />}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default Chat;
