import {Tag} from '../../constants';
import {MeetQuery, MeetResponse} from '../../types/meet';
import {api} from '../api';

export const meetApi = api.injectEndpoints({
  endpoints: build => ({
    getMeets: build.query<MeetResponse, MeetQuery>({
      query: params => ({
        url: '/meets',
        method: 'GET',
        params,
      }),
      providesTags: [Tag.MEET_TAG],
    }),
  }),
});

export const {useGetMeetsQuery} = meetApi;
