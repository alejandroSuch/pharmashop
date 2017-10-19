import { Action } from '@ngrx/store';
import { ADD_USER_SEX } from './regiser.actions.constants';

export class AddUserSexAction implements Action {
  readonly type: string = ADD_USER_SEX;

  constructor(private payload: string) {

  }
}
