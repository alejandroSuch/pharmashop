import { Action } from '@ngrx/store';
import { ADD_USER_PASSWORD } from './regiser.actions.constants';

export class AddUserPasswordAction implements Action {
  readonly type: string = ADD_USER_PASSWORD;

  constructor(private payload: string) {

  }
}
