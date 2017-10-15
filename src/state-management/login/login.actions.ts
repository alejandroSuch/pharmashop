import {LoginAction} from "./LoginAction";
import {LoginErrorAction} from "./LoginErrorAction";
import {ClearErrorAction} from "./ClearErrorAction";

export type Action = LoginAction |
  LoginErrorAction |
  ClearErrorAction;
