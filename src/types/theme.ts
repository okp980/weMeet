export interface ThemeState {
  theme: 'light' | 'dark' | 'system';
}

export interface ThemePayload {
  payload: Pick<ThemeState, 'theme'>;
}
