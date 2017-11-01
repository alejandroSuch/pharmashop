import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { UserRepository } from '../../domain/auth/repository/UserRepository';
import { FirebaseAuthService } from '../../firebase/auth/FirebaseAuthService';
import { FirebaseUserRepository } from '../../firebase/auth/FirebaseUserRepository';
import { AUTH_SERVICE, USER_REPOSITORY } from '../InjectionTokens';
import { config } from './firebase.config';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: FirebaseUserRepository
    },
    {
      provide: AUTH_SERVICE,
      deps: [AngularFireAuth, USER_REPOSITORY],
      useFactory: (angularFireAuth: AngularFireAuth, userRepository: UserRepository) => {
        return new FirebaseAuthService(angularFireAuth, userRepository);
      }
    }
  ]
})
export class FirestoreContextModule {

}
