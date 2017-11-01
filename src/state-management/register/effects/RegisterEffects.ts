import { Inject, Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { REGISTER_USER_COMMAND } from '../../../app/InjectionTokens';
import { RegisterUser } from '../../../domain/auth/command/RegisterUser';
import { REGISTER_USER } from '../actions/regiser.actions.constants';

@Injectable()
export class RegisterEffects {
  @Effect()
  register$ = this.action$
                  .ofType(REGISTER_USER)



  constructor(private action$: Actions, @Inject(REGISTER_USER_COMMAND)registerUser: RegisterUser) {

  }

}
