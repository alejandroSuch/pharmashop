import { Observable } from 'rxjs/Observable';
import { LoginCredentials } from '../model/LoginCredentials';
import { User } from '../model/User';

export interface AuthService {
  login(credentials: LoginCredentials): Observable<User|Error>;
  register(user: User): Observable<User|Error>;
}
