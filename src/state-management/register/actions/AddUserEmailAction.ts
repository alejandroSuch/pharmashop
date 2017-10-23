import { Action } from '@ngrx/store';
import { ADD_USER_EMAIL } from './regiser.actions.constants';

export class AddUserEmailAction implements Action {
  readonly type: string = ADD_USER_EMAIL;

  constructor(private payload: string) {

  }
}
