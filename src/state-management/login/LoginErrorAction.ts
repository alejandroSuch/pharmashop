import {Action} from "@ngrx/store";
import {LOGIN_ERROR} from "./login.actions.constants";
import {Error} from "../../domain/shared/Error";

export class LoginErrorAction implements Action {
  readonly type: string = LOGIN_ERROR;
  payload: Error;

  constructor(error: Error) {
    this.payload = error;
  }
}
