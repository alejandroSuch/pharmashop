import {LoginCredentials} from "../LoginCredentials";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../LoginService";

export class Login {
  constructor(private loginService: LoginService) {
  }

  public execute(credentials: LoginCredentials): Observable<any> {
    return this.loginService
      .login(credentials);
  }
}
