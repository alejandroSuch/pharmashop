import { Action } from '@ngrx/store';
import { ADD_USER_BIRTHDATE } from './regiser.actions.constants';

export class AddUserBirthDateAction implements Action {
  readonly type: string = ADD_USER_BIRTHDATE;

  constructor(public payload: Date) {

  }
}
