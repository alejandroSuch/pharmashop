import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { config } from './firebase.config';
import { EffectsModule } from '@ngrx/effects';
import { ErrorHandler, NgModule } from '@angular/core';
import { FirestoreContextModule } from './context/FirestoreContextModule';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LoginPageModule } from '../pages/login/login.module';
import { MyApp } from './app.component';
import { RegisterPage } from '../pages/register/register';
import { RegisterPageModule } from './../pages/register/register.module';
import { SlidesPage } from './../pages/slides/slides';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    MyApp,
    SlidesPage
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
    FirestoreContextModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule,
    RegisterPageModule
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
