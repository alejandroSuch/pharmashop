import { Action } from '@ngrx/store';
import { ADD_USER_PHONENUMBER } from './regiser.actions.constants';

export class AddUserPhoneNumberAction implements Action {
  readonly type: string = ADD_USER_PHONENUMBER;

  constructor(private payload: string) {

  }
}
