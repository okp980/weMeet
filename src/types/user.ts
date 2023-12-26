import {User} from './auth';
import {IQueryParams, Paginated} from './common';

export interface UsersResponse extends Paginated<User> {}
export interface IUsersQueryParams extends IQueryParams {}
