import { Observable } from 'rxjs/Observable';
import { LoginCredentials } from '../model/LoginCredentials';
import { AuthService } from '../service/AuthService';

export class Login {
  constructor(private authService: AuthService) {
  }

  public execute(credentials: LoginCredentials): Observable<any> {
    return this.authService.login(credentials);
  }
}
