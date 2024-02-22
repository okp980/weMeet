import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {
  AuthPayload,
  AuthState,
  FcmTokenPayload,
  OnboardedProfilePayload,
} from '../types/auth';

const initialState: AuthState = {
  token: null,
  user: null,
  hasOnboardedProfile: false,
  fcmToken: null,
  hasBeenWelcome: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, {payload: {token}}: AuthPayload) => {
      state.token = token;
    },
    clearAuth: state => {
      state.token = null;
      state.user = null;
    },
    setHasOnboardedProfile: (
      state,
      {payload: {onboarded}}: OnboardedProfilePayload,
    ) => {
      state.hasOnboardedProfile = onboarded;
    },
    setHasBeenWelcome: state => {
      state.hasBeenWelcome = true;
    },
    setFcmToken: (state, {payload: {fcmToken}}: FcmTokenPayload) => {
      state.fcmToken = fcmToken;
    },
    clearFcmToken: state => {
      state.fcmToken = null;
    },
  },
});

export const {
  authenticate,
  clearAuth,
  setHasOnboardedProfile,
  setFcmToken,
  clearFcmToken,
  setHasBeenWelcome,
} = slice.actions;
export const selectAuth = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectHasBeenWelcome = (state: RootState) =>
  state.auth.hasBeenWelcome;
export const selectHasOnboardedProfile = (state: RootState) =>
  state.auth.hasOnboardedProfile;
export const selectFcmToken = (state: RootState) => state.auth.fcmToken;
export default slice.reducer;
