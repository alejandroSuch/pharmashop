import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { LoginCredentials } from '../../domain/login/LoginCredentials';
import { LoginError } from '../../domain/login/LoginError';
import { LoginService } from '../../domain/login/LoginService';
import { UserNotFoundError } from '../../domain/login/UserNotFoundError';
import { Error } from '../../domain/shared/Error';

import { FirebaseLoginError } from './FirebaseLoginError';
import { FirebaseLoginErrorCodes } from './FirebaseLoginErrorCodes';

export class FirebaseLoginService implements LoginService {
  constructor(private angularFireAuth: AngularFireAuth) {

  }

  login(credentials: LoginCredentials): Observable<any> {
    return Observable
      .fromPromise(
        this.angularFireAuth
            .auth
            .signInWithEmailAndPassword(credentials.email, credentials.password)
      )
      .catch(error => FirebaseLoginService.onFirebaseLoginError(error, credentials));
  }

  private static onFirebaseLoginError(error: FirebaseLoginError, credentials: LoginCredentials): Observable<Error> {
    let result: Observable<Error> = null;

    switch (error.code) {
      case FirebaseLoginErrorCodes.USER_NOT_FOUND:
        result = Observable.throw(new UserNotFoundError(credentials));
        break;
      case FirebaseLoginErrorCodes.INVALID_PASSWORD:
        result = Observable.throw(new LoginError('Contraseña incorrecta.', error.code));
        break;
      default:
        result = Observable.throw(new LoginError('Se ha producido un error.', error.code));
    }

    return result;
  }
}
