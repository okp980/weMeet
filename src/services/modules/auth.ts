import {Tag} from '../../constants';
import {
  AuthResponse,
  Profile,
  SignInWithSocialBody,
  User,
} from '../../types/auth';
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
    getProfile: build.query<Profile, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
      providesTags: [Tag.PROFILE_TAG],
    }),
    updateProfile: build.mutation<
      Profile,
      Partial<Pick<Profile, 'name' | 'getNotifications'>>
    >({
      query: body => ({
        url: '/auth/profile',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(body, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          api.util.updateQueryData(
            'getProfile' as never,
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
      // invalidatesTags: [Tag.PROFILE_TAG],
    }),
    updateProfilePic: build.mutation<Profile, FormData>({
      query: body => ({
        url: '/auth/profile/pic',
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body,
        formData: true,
      }),

      invalidatesTags: [Tag.PROFILE_TAG],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInWithSocialMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePicMutation,
} = authApi;
