import {Action} from "@ngrx/store";
import {LoginCredentials} from "./LoginCredentials";
import {LoginError} from "./LoginError";

export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const USER_NOT_FOUND = 'USER_NOT_FOUND';

export class LoginAction implements Action {
  readonly type: string = LOGIN;
  payload:LoginCredentials;

  constructor(email:string, password:string) {
    this.payload = new LoginCredentials(email, password);
  }

}

export class UserNotFoundAction implements Action {
  readonly type: string = USER_NOT_FOUND;
}

export class LoginErrorAction implements Action {
  readonly type: string = LOGIN_ERROR;
  payload: LoginError;

  constructor(public message: string, public code: string) {
    this.payload = new LoginError(message, code);
  }
}
