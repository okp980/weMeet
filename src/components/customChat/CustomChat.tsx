import React, {useCallback, useEffect, useState} from 'react';
import {
  Bubble,
  GiftedChat,
  Time,
  InputToolbar,
  Send,
  IMessage,
} from 'react-native-gifted-chat';
import socket from '../../services/socket';
import {IServerMessage} from '../../types/chat';

type Props = {
  friendId: number | null;
};
const CustomChat = ({friendId}: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const generateGiftedMsg = useCallback((mssg: IServerMessage): IMessage => {
    const {
      id,
      content,
      createdAt,
      user: {
        id: userId,
        profile: {firstName},
      },
    } = mssg;
    return {
      _id: id,
      text: content,
      createdAt: new Date(createdAt),
      user: {_id: userId, name: firstName},
      sent: true,
    };
  }, []);

  useEffect(() => {
    const onMessage = (data: IServerMessage) => {
      setMessages((previousMessages: IMessage[]) =>
        GiftedChat.append(previousMessages, [generateGiftedMsg(data)]),
      );
    };
    const onMessages = (data: IServerMessage[]) => {
      const giftedMessages = data.map(message => generateGiftedMsg(message));
      setMessages((previousMessages: IMessage[]) =>
        GiftedChat.append(previousMessages, giftedMessages),
      );
    };
    socket.on('message', onMessage);
    socket.emit('messages', {friendId}, onMessages);
    return () => {
      socket.off('message', onMessage);
      socket.off('messages', onMessages);
    };
  }, [friendId, socket]);

  const onSend = useCallback(
    (messages: IMessage[] = []) => {
      if (friendId) {
        socket.emit('createMessage', {content: messages[0].text, friendId});
      }

      setMessages((previousMessages: any) =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [friendId],
  );
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderAvatar={null}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#E9405715',
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              padding: 10,
            },
            right: {
              backgroundColor: '#F3F3F3',
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              padding: 10,
            },
          }}
          textStyle={{
            right: {color: 'black', fontSize: 14},
            left: {fontSize: 14},
          }}
          renderTime={props => (
            <Time {...props} timeTextStyle={{right: {color: 'gray'}}} />
          )}
        />
      )}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            borderWidth: 1,
            borderRadius: 15,
            borderColor: '#F3F3F3',
            borderTopColor: '#F3F3F3',
          }}
          renderSend={props => (
            <Send
              {...props}
              containerStyle={{borderWidth: 0}}
              textStyle={{color: '#E94057'}}
            />
          )}
        />
      )}
    />
  );
};

export default CustomChat;
