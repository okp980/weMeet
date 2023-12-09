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
    addToken: (state, {payload: {token}}: AuthPayload) => {
      state.token = token;
    },
    clearToken: state => {
      state.token = null;
    },
  },
});

export const {addToken, clearToken} = slice.actions;
export const selectAuth = (state: RootState) => state.auth.token;
export const selectOboardStatus = (state: RootState) =>
  state.auth.onboard_status;
export default slice.reducer;
