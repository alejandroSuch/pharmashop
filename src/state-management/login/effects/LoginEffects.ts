import { Inject, Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { AUTH_SERVICE } from '../../../app/InjectionTokens';
import { AuthService } from '../../../domain/auth/service/AuthService';

import { LOGIN, LOGIN_SUCCESS } from '../actions/login.actions.constants';
import { LoginAction } from '../actions/LoginAction';
import { LoginErrorAction } from '../actions/LoginErrorAction';

@Injectable()
export class LoginEffects {
  @Effect()
  login$ = this.action$
               .ofType(LOGIN)
               .map((action: LoginAction) => action.payload)
               .mergeMap(
                 credentials =>
                   this.loginService
                       .login(credentials)
                       .catch(error => Observable.of(new LoginErrorAction(error)))
               );

  constructor(private action$: Actions, @Inject(AUTH_SERVICE) private loginService: AuthService) {
  }
}
