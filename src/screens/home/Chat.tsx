import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityCard,
  CustomInput,
  CustomText,
  Form,
  Layout,
  Message,
  MessageCard,
} from '../../components';
import {Controller} from 'react-hook-form';
import {useGetMeetsQuery} from '../../services/modules/meet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import socket from '../../services/socket';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAuth} from '../../hooks';
import {IChat} from '../../types/chat';

type Props = any;

type FormValues = {
  search: string;
};

const Chat = ({navigation}: Props) => {
  const bottomRef = useRef<BottomSheetModal>(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [friendId, setFriendId] = useState<number | null>(null);
  const [chats, setChats] = useState<IChat[]>([]);
  const {removeAuth} = useAuth();

  const {
    data: matches,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMeetsQuery({page: 1, limit: 10});
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onError(error: any) {
      console.log('error is', error);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatEvent(chats: IChat[]) {
      console.log('chats is here', chats);

      setChats(previous => chats);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    // socket.emit('chats', {}, onChatEvent); // for pagination TODO later, remove from here
    socket.on('chats', onChatEvent);
    socket.on('connect_error', onError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError);
      socket.off('chats', onChatEvent);
    };
  }, []);

  const handleOpenMessage = (userId: number) => {
    setFriendId(userId);
    bottomRef?.current?.present();
  };

  const signOut = async () => {
    try {
      const signout = await GoogleSignin.signOut();
      console.log(signout);
      console.log('ssigned out');
      removeAuth();
    } catch (error) {
      console.error(error);
    }
  };

  // signOut();

  return (
    <Layout>
      <View>
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
          data={matches?.data ?? []}
          renderItem={({item}) => (
            <ActivityCard
              meet={item}
              userId={matches?.currentUserId!}
              openMessage={() => {
                handleOpenMessage(item.id);
              }}
            />
          )}
          keyExtractor={(item, index) => (item.id + index).toString()}
          ItemSeparatorComponent={() => <View className="mr-4" />}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <CustomText as="regular" className="text-center">
              No Friends yet.
            </CustomText>
          }
        />
      </View>
      <View className="flex-1">
        <CustomText as="h3">Messages</CustomText>
        <FlatList
          className="my-2"
          data={chats}
          renderItem={({item}) => (
            <MessageCard
              item={item}
              openMessage={() => handleOpenMessage(item?.recipient?.id)}
            />
          )}
          keyExtractor={(item, index) => (item.id + index).toString()}
          ItemSeparatorComponent={() => <View className="mb-2" />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <CustomText as="regular" className="text-center">
              No Chats yet.
            </CustomText>
          }
        />
      </View>
      <Message ref={bottomRef} friendId={friendId} />
    </Layout>
  );
};

export default Chat;
