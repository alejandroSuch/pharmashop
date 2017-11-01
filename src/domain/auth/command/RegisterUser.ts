import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/User';
import { AuthService } from '../service/AuthService';

export class RegisterUser {
  constructor(private authService: AuthService) {
  }

  register(user: User): Observable<User|Error> {
    return this.authService.register(user);
  }
}
