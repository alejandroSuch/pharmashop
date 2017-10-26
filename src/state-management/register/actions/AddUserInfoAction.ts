import { Action } from '@ngrx/store';
import { ADD_USER_INFO } from './regiser.actions.constants';
import { RegisterUser } from './../RegisterState';

export class AddUserInfoAction implements Action {
  readonly type: string = ADD_USER_INFO;

  constructor(public payload: Partial<RegisterUser>) {

  }
}
