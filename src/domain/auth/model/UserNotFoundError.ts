import { DomainError } from '../../shared/Error';
import { LoginCredentials } from './LoginCredentials';

export class UserNotFoundError extends DomainError {
  constructor(public credentials: LoginCredentials) {
    super('User not found');
  }
}
