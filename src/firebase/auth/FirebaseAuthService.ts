import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../domain/auth/service/AuthService';
import { FirebaseLoginError } from './FirebaseLoginError';
import { FirebaseLoginErrorCodes } from './FirebaseLoginErrorCodes';
import { LoginCredentials } from '../../domain/auth/model/LoginCredentials';
import { LoginError } from '../../domain/auth/model/LoginError';
import { Observable } from 'rxjs/Observable';
import { User } from '../../domain/auth/model/User';
import { User as FirebaseUser } from 'firebase';
import { UserNotFoundError } from '../../domain/auth/model/UserNotFoundError';
import { UserRepository } from '../../domain/auth/repository/UserRepository';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

export class FirebaseAuthService implements AuthService {
  constructor(private afAuth: AngularFireAuth, private userRepository: UserRepository) {

  }

  login(credentials: LoginCredentials): Observable<User | Error> {
    debugger;
    return Observable
      .fromPromise(
        this.afAuth
            .auth
            .signInWithEmailAndPassword(credentials.email, credentials.password)
      )
      .map(() => {
        debugger;
        return this.afAuth.auth.currentUser.uid
      })
      .mergeMap((uid: string) => {
      debugger;
        return this.userRepository.findById(uid);
      })
      .map((it:any) => {
        debugger;
        return it;
      })
      .catch(error => FirebaseAuthService.onFirebaseLoginError(error, credentials));
  }

  register(user: User): Observable<User | Error> {
    debugger;

    return Observable
      .fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password))
      .mergeMap((firebaseUser:FirebaseUser) => {
        debugger;
        return this.userRepository.save(<User>{ ...user, id: firebaseUser.uid });
      })
      .map(() => this.afAuth.auth.currentUser.uid)
      .mergeMap((uid: string) => this.userRepository.findById(uid))
      .catch(() => {
        debugger;
        return Observable.throw('mierda');
      });
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
