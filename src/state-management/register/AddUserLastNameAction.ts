import { Action } from '@ngrx/store';
import { ADD_USER_LASTNAME } from './regiser.actions.constants';

export class AddUserLastNameAction implements Action {
  readonly type: string = ADD_USER_LASTNAME;

  constructor(private payload: string) {

  }
}
