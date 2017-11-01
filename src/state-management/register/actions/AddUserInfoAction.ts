import { Action } from '@ngrx/store';
import { User } from '../../../domain/auth/model/User';
import { ADD_USER_INFO } from './regiser.actions.constants';

export class AddUserInfoAction implements Action {
  readonly type: string = ADD_USER_INFO;

  constructor(public payload: Partial<User>) {

  }
}
