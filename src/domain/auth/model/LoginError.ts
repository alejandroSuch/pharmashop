import { DomainError } from '../../shared/Error';

export class LoginError extends DomainError {
  constructor(public name, public code) {
    super(code);
  }
}
