import {Tag} from '../../constants';
import {
  MeetBody,
  MeetQuery,
  MeetResponse,
  MeetUpdateBody,
} from '../../types/meet';
import {api} from '../api';

export const meetApi = api.injectEndpoints({
  endpoints: build => ({
    getMeets: build.query<MeetResponse[], MeetQuery>({
      query: params => ({
        url: '/meets',
        method: 'GET',
        params,
      }),
      providesTags: [Tag.MEET_TAG],
    }),
    getSingleMeet: build.query<MeetResponse, {id: number}>({
      query: id => ({
        url: `/meets/${id}`,
        method: 'GET',
      }),
    }),
    requestMeet: build.mutation<MeetResponse, MeetBody>({
      query: body => ({
        url: '/meets',
        method: 'POST',
        body,
      }),
    }),
    updateMeets: build.mutation<MeetResponse, MeetUpdateBody>({
      query: ({id, ...body}) => ({
        url: `/meets/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetMeetsQuery,
  useGetSingleMeetQuery,
  useRequestMeetMutation,
  useUpdateMeetsMutation,
} = meetApi;
