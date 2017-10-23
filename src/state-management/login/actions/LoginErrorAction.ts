import { Action } from '@ngrx/store';
import { Error } from '../../../domain/shared/Error';
import { LOGIN_ERROR } from './login.actions.constants';

export class LoginErrorAction implements Action {
  readonly type: string = LOGIN_ERROR;
  payload: Error;

  constructor(error: Error) {
    this.payload = error;
  }
}
