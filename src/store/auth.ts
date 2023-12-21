import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {AuthPayload, AuthState} from '../types/auth';

const initialState: AuthState = {
  token: null,
  user: null,
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
  },
});

export const {authenticate, clearAuth} = slice.actions;
export const selectAuth = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export default slice.reducer;
