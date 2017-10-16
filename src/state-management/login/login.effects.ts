import { Inject, Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { LOGIN_SERVICE } from '../../app/InjectionTokens';
import { LoginService } from '../../domain/login/LoginService';
import { Action } from './login.actions';

import { LOGIN } from './login.actions.constants';
import { LoginErrorAction } from './LoginErrorAction';

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
