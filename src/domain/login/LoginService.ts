import { Observable } from 'rxjs/Observable';
import { LoginCredentials } from './LoginCredentials';

export interface LoginService {
  login(credentials: LoginCredentials): Observable<any>;
}
