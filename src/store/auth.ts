import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {AuthPayload, AuthState} from '../types/auth';

const initialState: AuthState = {
  token: null,
  onboard_status: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, {payload: {token, onboard_status}}: AuthPayload) => {
      state.token = token;
      state.onboard_status = onboard_status;
    },
    clearAuth: state => {
      state.token = null;
      state.onboard_status = null;
    },
  },
});

export const {authenticate, clearAuth} = slice.actions;
export const selectAuth = (state: RootState) => state.auth.token;
export const selectOboardStatus = (state: RootState) =>
  state.auth.onboard_status;
export default slice.reducer;
