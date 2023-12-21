import {AuthResponse, SignInWithSocialBody, User} from '../../types/auth';
import {api} from '../api';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    signInWithSocial: build.mutation<AuthResponse, SignInWithSocialBody>({
      query: body => ({
        url: '/auth/social-login',
        method: 'POST',
        body,
      }),
    }),
    getProfile: build.query<User, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {useSignInWithSocialMutation, useGetProfileQuery} = authApi;
