import { ClearErrorAction } from './ClearErrorAction';
import { LoginAction } from './LoginAction';
import { LoginErrorAction } from './LoginErrorAction';

export type Action = LoginAction |
  LoginErrorAction |
  ClearErrorAction;
