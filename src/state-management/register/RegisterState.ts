import { User } from '../../domain/auth/model/User';
import { DomainError } from '../../domain/shared/Error';

export interface RegisterState {
  user?: User;
  error?: DomainError;
}
