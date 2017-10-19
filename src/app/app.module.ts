import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPage } from '../pages/register/register';
import { SlidesPage } from './../pages/slides/slides';

import { MyApp } from './app.component';
import { ApplicationContextModule } from './context/FirestoreContextModule';

import { config } from './firebase.config';

@NgModule({
  declarations: [
    MyApp,
    SlidesPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          backButtonText: 'Atrás'
        }
      }
    }),
    ApplicationContextModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SlidesPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
