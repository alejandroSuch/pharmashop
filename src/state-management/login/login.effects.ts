import {Actions, Effect} from "@ngrx/effects";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {LOGIN} from "./login.actions.constants";

import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";

import {Action} from "./login.actions";
import {LoginErrorAction} from "./LoginErrorAction";
import {LoginAction} from "./LoginAction";
import {UserNotFoundError} from "../../domain/login/UserNotFoundError";
import {LoginError} from "../../domain/login/LoginError";
import {LOGIN_SERVICE} from "../../app/InjectionTokens";
import {LoginService} from "../../domain/login/LoginService";

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
  login$: Observable<Action> = this.action$
    .ofType(LOGIN)
    .map((action: LoginAction) => action.payload)
    .mergeMap(
      credentials =>
        this.loginService
          .login(credentials)
          .catch(error => {
            console.log('we have an error', error);
            return Observable.of(this.onLoginError(error, credentials));
          })
    );

  private onLoginError(error: IError, credentials): Action {
    let result: Action;
debugger;
    switch (error.code) {
      case ErrorCodes.USER_NOT_FOUND:
        result = new LoginErrorAction(new UserNotFoundError(credentials));
        break;
      case ErrorCodes.INVALID_PASSWORD:
        result = new LoginErrorAction(new LoginError('Contraseña incorrecta.', error.code));
        break;
      default:
        result = new LoginErrorAction(new LoginError('Se ha producido un error.', error.code));
        break;
    }

    return result;
  }

  // constructor(private action$: Actions, private auth: AngularFireAuth) {
  constructor(private action$: Actions, @Inject(LOGIN_SERVICE) private loginService: LoginService) {
  }
}
