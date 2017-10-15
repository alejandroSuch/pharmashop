import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";

import {LoginService} from "../../domain/login/LoginService";
import {LoginCredentials} from "../../domain/login/LoginCredentials";

import "rxjs/add/observable/fromPromise";

export class FirebaseLoginService implements LoginService {
  constructor(private angularFireAuth: AngularFireAuth) {

  }

  login(credentials: LoginCredentials): Observable<any> {
    console.log('logging in with', credentials);

    return Observable.fromPromise(
      this.angularFireAuth
        .auth
        .signInWithEmailAndPassword(credentials.email, credentials.password)
    )
  }

}
