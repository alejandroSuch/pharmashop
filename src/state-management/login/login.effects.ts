import {Actions, Effect} from "@ngrx/effects";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {LOGIN} from "./login.actions.constants";
import {Action} from "./login.actions";
import {LoginErrorAction} from "./LoginErrorAction";
import {LOGIN_SERVICE} from "../../app/InjectionTokens";
import {LoginService} from "../../domain/login/LoginService";

import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";

@Injectable()
export class LoginEffects {
  @Effect()
  login$: Observable<Action> = this.action$
    .ofType(LOGIN)
    .map(action => action.payload)
    .mergeMap(
      credentials =>
        this.loginService
          .login(credentials)
          .catch(error => Observable.of(new LoginErrorAction(error)))
    );

  constructor(private action$: Actions, @Inject(LOGIN_SERVICE) private loginService: LoginService) {
  }
}
