import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { config } from './firebase.config';
import { FirebaseLoginService } from '../../firebase/login/FirebaseLoginService';
import { Login } from '../../domain/login/usecase/Login';
import { LOGIN_SERVICE, LOGIN_USE_CASE } from '../InjectionTokens';
import { LoginService } from '../../domain/login/LoginService';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
        return new Login(loginService);
      }
    }
  ]
})
export class FirestoreContextModule {

}
