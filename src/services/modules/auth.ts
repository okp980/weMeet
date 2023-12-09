import {AuthResponse} from '../../types/auth';
import {api} from '../api';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    signInWithSocial: build.query<AuthResponse, void>({
      query: () => '/auth/signin-social',
    }),
  }),
  overrideExisting: false,
});

export const {useSignInWithSocialQuery} = authApi;
