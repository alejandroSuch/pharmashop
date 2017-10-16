import { Action } from '@ngrx/store';
import { CLEAR_ERROR } from './login.actions.constants';

export class ClearErrorAction implements Action {
  readonly type: string = CLEAR_ERROR;
}
