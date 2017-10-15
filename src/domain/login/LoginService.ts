import {LoginCredentials} from "./LoginCredentials";
import {Observable} from "rxjs/Observable";

export interface LoginService {
  login(credentials: LoginCredentials): Observable<any>;
}
