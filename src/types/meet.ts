import {User} from './auth';

type MeetStatus = 'pending' | 'accepted' | 'rejected';

export interface MeetResponse {
  id: number;
  recipient: User;
  status: string;
  creator: User;
  createdAt: string;
  updatedAt: string;
}

export type MatchData = {
  title: string;
  data: MeetResponse[];
}[];

export interface MeetBody {
  recipient: number;
}
export interface MeetQuery {
  status: MeetStatus;
}
export interface MeetUpdateBody {
  id: number;
  status: string;
}
