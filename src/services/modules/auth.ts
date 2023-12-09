import {AuthResponse, SignInWithSocialBody} from '../../types/auth';
import {api} from '../api';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    signInWithSocial: build.mutation<AuthResponse, SignInWithSocialBody>({
      query: body => ({
        url: '/auth/signin-social',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {useSignInWithSocialMutation} = authApi;
