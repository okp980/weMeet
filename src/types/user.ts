import {Profile, User} from './auth';
import {IQueryParams, Paginated} from './common';

export interface UsersResponse extends Paginated<User> {}
export interface NotificationResponse
  extends Pick<Profile, 'getNotifications' | 'id'> {}
export interface IUsersQueryParams extends IQueryParams {}
export interface GetNotificationDataBody
  extends Pick<Profile, 'getNotifications'> {}
