import {Tag} from '../../constants';
import {Profile, User} from '../../types';
import {
  GetNotificationDataBody,
  IUsersQueryParams,
  NotificationResponse,
  UsersResponse,
} from '../../types/user';
import {api} from '../api';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    users: build.query<UsersResponse, IUsersQueryParams>({
      query: params => ({
        url: '/users',
        method: 'GET',
        params,
      }),
    }),

    getNotification: build.query<NotificationResponse, void>({
      query: () => '/me/notification',
      providesTags: [Tag.NOTIFICATION_TAG],
    }),
    updateNofication: build.mutation<User, GetNotificationDataBody>({
      query: body => ({
        url: '/me/notification',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {useUsersQuery} = userApi;
