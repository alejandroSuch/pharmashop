import { Actions, Effect } from '@ngrx/effects';
import { Inject, Injectable } from '@angular/core';
import { REGISTER_STORE } from '../feature';
import { REGISTER_USER } from '../actions/regiser.actions.constants';
import { REGISTER_USER_COMMAND } from '../../../app/InjectionTokens';
import { RegisterState } from '../RegisterState';
import { RegisterUser } from '../../../domain/auth/command/RegisterUser';
import { RegisterUserCompleteAction } from '../actions/RegisterUserCompleteAction';
import { Store } from '@ngrx/store';
import { User } from '../../../domain/auth/model/User';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';


@Injectable()
export class RegisterEffects {
  @Effect()
  register$ = this.action$
                  .ofType(REGISTER_USER)
                  .withLatestFrom(this.store$, (action, state: RegisterState) => state.user)
                  .mergeMap((user: User) => this.registerUser.execute(user))
                  .map((user) => new RegisterUserCompleteAction());

  constructor(private action$: Actions,
              @Inject(REGISTER_STORE) private store$: Store<RegisterState>,
              @Inject(REGISTER_USER_COMMAND) private registerUser: RegisterUser) {

  }

}
