import { Action } from '@ngrx/store';
import { LoginCredentials } from '../../../domain/login/LoginCredentials';
import { LOGIN } from './login.actions.constants';

export class LoginAction implements Action {
  readonly type: string = LOGIN;
  payload: LoginCredentials;

  constructor(email: string, password: string) {
    this.payload = new LoginCredentials(email, password);
  }

}
