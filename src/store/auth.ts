import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {AuthPayload, AuthState, OnboardedProfilePayload} from '../types/auth';

const initialState: AuthState = {
  token: null,
  user: null,
  hasOnboardedProfile: false,
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
  },
});

export const {authenticate, clearAuth, setHasOnboardedProfile} = slice.actions;
export const selectAuth = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectHasOnboardedProfile = (state: RootState) =>
  state.auth.hasOnboardedProfile;
export default slice.reducer;
