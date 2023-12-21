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

// export interface User {
//   image: string;

//   firstName: string;

//   lastName: string;

//   gender: string;

//   dateOfBirth: string;

//   passion: string[];

//   getNotifications: boolean;

//   email: string;
// }

export interface SignInWithSocialBody {
  token: string;
  provider: SocialProvider;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface AuthPayload {
  payload: Pick<NonNullable<AuthState>, 'token'>;
}

export interface AuthResponse {
  access_token: string;
}

export interface Profile {
  createdAt: string;
  dateOfBirth: string;
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
