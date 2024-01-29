import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {ThemePayload, ThemeState} from '../types';

const initialState: ThemeState = {
  theme: 'system',
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (state, {payload: {theme}}: ThemePayload) => {
      state.theme = theme;
    },
    setDefault: state => {
      state.theme = 'system';
    },
  },
});

export const {updateTheme, setDefault} = slice.actions;
export const selectTheme = (state: RootState) => state.theme.theme;
export default slice.reducer;
