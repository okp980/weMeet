import {Profile, User} from './auth';

export interface OnboardingResponse extends User {}

export interface BioDataBody
  extends Pick<Profile, 'firstName' | 'lastName' | 'dateOfBirth'> {}

export interface GenderDataBody extends Pick<Profile, 'gender'> {}
export interface PassionDataBody extends Pick<Profile, 'passion'> {}
