import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store';
import {clearAuth} from '../store/auth';
import {Tag} from '../constants';

import {DEV_API_URL, STAGING_API_URL} from '@env';

interface CustomError {
  data: {message: string; statusCode: number};
  status: number;
}
const baseUrl = __DEV__ ? DEV_API_URL : STAGING_API_URL;
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders(headers, api) {
    const token = (api.getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(clearAuth());
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    {}
  >,
  endpoints: () => ({}),
  tagTypes: [
    Tag.MEET_TAG,
    Tag.MEET_REQUEST_TAG,
    Tag.NOTIFICATION_TAG,
    Tag.PROFILE_TAG,
  ],
});
