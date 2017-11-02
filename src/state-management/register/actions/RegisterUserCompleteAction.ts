import { Action } from '@ngrx/store';
import { REGISTER_USER_COMPLETE } from './regiser.actions.constants';

export class RegisterUserCompleteAction implements Action {
  readonly type: string = REGISTER_USER_COMPLETE;
}
