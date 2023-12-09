export enum OnboardStatus {
  BIO_DATA = 'bio-data',
  GENDER = 'genderer',
  INTEREST = 'interest',
  NOTIFICATION = 'notification',
}

export interface AuthState {
  token: string | null;
  onboard_status: OnboardStatus | null;
}

export interface AuthPayload {
  payload: NonNullable<Pick<AuthState, 'token'>>;
}

export interface AuthResponse {
  token: string;
  onboard_status: OnboardStatus;
}
