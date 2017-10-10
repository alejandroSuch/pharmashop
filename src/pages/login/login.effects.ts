import {Actions, Effect} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {LOGIN, LoginAction, LoginErrorAction, UserNotFoundAction} from "./login.actions";

import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";

import {LoginCredentials} from "./LoginCredentials";
import {Action} from "@ngrx/store";

const ErrorCodes = {
  USER_NOT_FOUND: 'auth/user-not-found',
  INVALID_PASSWORD: 'auth/wrong-password'
};

interface IError {
  code: string
}

@Injectable()
export class LoginEffects {
  @Effect()
  login$: Observable<LoginAction> = this.action$
    .ofType(LOGIN)
    .mergeMap((action: LoginAction) => {
      const credentials: LoginCredentials = action.payload;
      return Observable
        .fromPromise(this.auth.auth.signInWithEmailAndPassword(credentials.email, credentials.password))
        .catch((error: IError) => {
          let result: Action;

          switch (error.code) {
            case ErrorCodes.USER_NOT_FOUND:
              result = new UserNotFoundAction();
              break;
            case ErrorCodes.INVALID_PASSWORD:
              result = new LoginErrorAction('Contraseña incorrecta.', error.code);
              break;
            default:
              result = new LoginErrorAction('Se ha producido un error.', error.code);
              break;
          }

          return Observable.of(result);
        });
    });

  constructor(private action$: Actions, private auth: AngularFireAuth) {
  }
}
