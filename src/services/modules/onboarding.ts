import {
  BioDataBody,
  GenderDataBody,
  OnboardingResponse,
  PassionDataBody,
} from '../../types/onboarding';
import {api} from '../api';

export const onboardingApi = api.injectEndpoints({
  endpoints: build => ({
    bioData: build.mutation<OnboardingResponse, FormData>({
      query: body => ({
        url: '/onboarding/bio-data',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body,
        formData: true,
      }),
    }),
    gender: build.mutation<OnboardingResponse, GenderDataBody>({
      query: body => ({
        url: '/onboarding/gender',
        method: 'POST',
        body,
      }),
    }),
    passion: build.mutation<OnboardingResponse, PassionDataBody>({
      query: body => ({
        url: '/onboarding/passion',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {useBioDataMutation, useGenderMutation, usePassionMutation} =
  onboardingApi;
