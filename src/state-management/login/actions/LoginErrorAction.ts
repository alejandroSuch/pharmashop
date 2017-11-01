import { DomainError } from '../../../domain/shared/Error';
import { LOGIN_ERROR } from './login.actions.constants';

export class LoginErrorAction extends DomainError {
  readonly type: string = LOGIN_ERROR;
  payload: Error;

  constructor(message:string) {
    super(message);

    this.payload = this;
  }
}
