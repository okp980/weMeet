import {Tag} from '../../constants';
import {
  MeetRequestBody,
  MeetRequestParam,
  MeetRequestQuery,
  MeetRequestResponse,
  MeetRequestUpdateBody,
} from '../../types/meet';
import {api} from '../api';

export const meetRequestApi = api.injectEndpoints({
  endpoints: build => ({
    getMeetRequests: build.query<MeetRequestResponse[], MeetRequestQuery>({
      query: params => ({
        url: '/meet-requests',
        method: 'GET',
        params,
      }),
      providesTags: [Tag.MEET_REQUEST_TAG],
    }),
    getSingleMeetRequest: build.query<MeetRequestResponse, MeetRequestParam>({
      query: id => ({
        url: `/meet-requests/${id}`,
        method: 'GET',
      }),
    }),
    requestMeet: build.mutation<MeetRequestResponse, MeetRequestBody>({
      query: body => ({
        url: '/meet-requests',
        method: 'POST',
        body,
      }),
    }),
    updateMeetRequest: build.mutation<
      MeetRequestResponse,
      MeetRequestUpdateBody
    >({
      query: ({id, ...body}) => ({
        url: `/meet-requests/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [Tag.MEET_TAG, Tag.MEET_TAG],
    }),
  }),
});

export const {
  useGetMeetRequestsQuery,
  useGetSingleMeetRequestQuery,
  useRequestMeetMutation,
  useUpdateMeetRequestMutation,
} = meetRequestApi;
