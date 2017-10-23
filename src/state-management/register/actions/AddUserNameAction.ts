import { Action } from '@ngrx/store';
import { ADD_USER_NAME } from './regiser.actions.constants';

export class AddUserNameAction implements Action {
  readonly type: string = ADD_USER_NAME;

  constructor(public payload: string) {

  }
}
