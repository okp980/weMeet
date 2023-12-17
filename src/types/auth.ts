export enum OnboardStatus {
  BIO_DATA = 'bio-data',
  GENDER = 'gender',
  INTEREST = 'interest',
  NOTIFICATION = 'notification',
  COMPLETE = 'complete',
}

export enum SocialProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
}

export interface SignInWithSocialBody {
  token: string;
  provider: SocialProvider;
}

export interface AuthState {
  token: string | null;
  onboard_status: OnboardStatus | null;
}

export interface AuthPayload {
  payload: NonNullable<AuthState>;
}

export interface AuthResponse {
  access_token: string;
  onboard_status: OnboardStatus;
}
