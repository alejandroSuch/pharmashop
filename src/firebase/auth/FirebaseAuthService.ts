import { AngularFireAuth } from 'angularfire2/auth';
import { User as FirebaseUser } from 'firebase';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { LoginCredentials } from '../../domain/auth/model/LoginCredentials';
import { LoginError } from '../../domain/auth/model/LoginError';
import { User } from '../../domain/auth/model/User';
import { UserNotFoundError } from '../../domain/auth/model/UserNotFoundError';
import { UserRepository } from '../../domain/auth/repository/UserRepository';
import { AuthService } from '../../domain/auth/service/AuthService';

import { FirebaseLoginError } from './FirebaseLoginError';
import { FirebaseLoginErrorCodes } from './FirebaseLoginErrorCodes';


export class FirebaseAuthService implements AuthService {
  constructor(private afAuth: AngularFireAuth, private userRepository: UserRepository) {

  }

  login(credentials: LoginCredentials): Observable<User | Error> {
    return Observable
      .fromPromise(
        this.afAuth
            .auth
            .signInWithEmailAndPassword(credentials.email, credentials.password)
      )
      .map(() => this.afAuth.auth.currentUser.uid)
      .mergeMap((uid: string) => this.userRepository.findById(uid))
      .catch(error => FirebaseAuthService.onFirebaseLoginError(error, credentials));
  }

  register(user: User): Observable<User | Error> {
    const registrationPromise: Promise<FirebaseUser> = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

    return Observable
      .fromPromise(registrationPromise)
      .map((registeredUser: FirebaseUser) => (<User>{ ...user, id: registeredUser.uid }))
      .mergeMap((userToPersist: User) => this.userRepository.save(userToPersist))
      .map(() => this.afAuth.auth.currentUser.uid)
      .mergeMap((uid: string) => this.userRepository.findById(uid));
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
