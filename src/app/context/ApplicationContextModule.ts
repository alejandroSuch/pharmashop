import {NgModule} from "@angular/core";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";

import {LOGIN_SERVICE, LOGIN_USE_CASE} from "../InjectionTokens";
import {LoginService} from "../../domain/login/LoginService";
import {FirebaseLoginService} from "../../firebase/login/FirebaseLoginService";
import {Login} from "../../domain/login/usecase/Login";

@NgModule({
  imports: [
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: LOGIN_SERVICE,
      deps: [AngularFireAuth],
      useFactory: angularFireAuth => new FirebaseLoginService(angularFireAuth)
    },
    {
      provide: LOGIN_USE_CASE,
      deps: [LOGIN_SERVICE],
      useFactory: (loginService: LoginService) => {
        debugger;
        return new Login(loginService);
      }
    }
  ]
})
export class ApplicationContextModule {

}
