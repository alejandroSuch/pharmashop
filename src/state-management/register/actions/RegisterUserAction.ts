import { Action } from '@ngrx/store';
import { REGISTER_USER } from './regiser.actions.constants';

export class RegisterUserAction implements Action {
  readonly type: string = REGISTER_USER;
}
