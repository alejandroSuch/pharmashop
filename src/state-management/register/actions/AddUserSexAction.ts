import { Action } from '@ngrx/store';
import { ADD_USER_SEX } from './regiser.actions.constants';
import { Sex } from '../../../domain/shared/Sex';

export class AddUserSexAction implements Action {
  readonly type: string = ADD_USER_SEX;

  constructor(public payload: Sex) {

  }
}
