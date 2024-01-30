import {Tag} from '../../constants';
import {User} from '../../types';
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
      async onQueryStarted(body, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          api.util.updateQueryData(
            'getNotification' as never,
            undefined as never,
            draft => {
              Object.assign(draft, body);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
  }),
});

export const {
  useUsersQuery,
  useGetNotificationQuery,
  useUpdateNoficationMutation,
} = userApi;
