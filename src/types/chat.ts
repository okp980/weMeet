import {User} from './auth';

export interface IChat {
  id: number;
  messages: IServerMessage[];
  recipient: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServerMessage {
  id: number;
  user: User;
  chat: IChat;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
