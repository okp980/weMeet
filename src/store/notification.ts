import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {
  MatchNotificationPayload,
  NotificationState,
} from '../types/notification';

const initialState: NotificationState = {
  hasMatchRequest: true,
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateMatchRequest: (
      state,
      {payload: {status}}: MatchNotificationPayload,
    ) => {
      state.hasMatchRequest = status;
    },
  },
});

export const {updateMatchRequest} = slice.actions;
export const selectHasMatchRequest = (state: RootState) =>
  state.notification.hasMatchRequest;

export default slice.reducer;
