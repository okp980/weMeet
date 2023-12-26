import {IUsersQueryParams, UsersResponse} from '../../types/user';
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
  }),
});

export const {useUsersQuery} = userApi;
