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
  fcmToken: string | null;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  hasOnboardedProfile: boolean;
  fcmToken: string | null;
}

export interface AuthPayload {
  payload: Pick<NonNullable<AuthState>, 'token'>;
}
export interface FcmTokenPayload {
  payload: Pick<NonNullable<AuthState>, 'fcmToken'>;
}

export interface OnboardedProfilePayload {
  payload: {onboarded: boolean};
}

export interface AuthResponse {
  access_token: string;
}

export interface Profile {
  createdAt: string;
  age: number;
  email: string;
  firstName: string;
  gender: string;
  getNotifications: string;
  id: number;
  image: string;
  lastName: string;
  passion: string[];
  updatedAt: string;
  userId: number;
}

export interface User {
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  profile: Profile;
}
