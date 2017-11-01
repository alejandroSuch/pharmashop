import { NgModule } from '@angular/core';
import { Login } from '../../domain/auth/command/Login';
import { RegisterUser } from '../../domain/auth/command/RegisterUser';
import { AuthService } from '../../domain/auth/service/AuthService';
import { AUTH_SERVICE, LOGIN_COMMAND, REGISTER_USER_COMMAND } from '../InjectionTokens';

@NgModule({
  imports: [],
  providers: [
    {
      provide: LOGIN_COMMAND,
      deps: [AUTH_SERVICE],
      useFactory: (loginService: AuthService) => {
        return new Login(loginService);
      }
    },
    {
      provide: REGISTER_USER_COMMAND,
      deps: [AUTH_SERVICE],
      useFactory: (authService: AuthService) => {
        return new RegisterUser(authService);
      }
    }
  ]
})
export class ApplicationContextModule {

}
