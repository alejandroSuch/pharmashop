import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from './../pages/register/register.module';
import { SlidesPage } from './../pages/slides/slides';
import { MyApp } from './app.component';
import { ApplicationContextModule } from './context/ApplicationContextModule';
import { FirestoreContextModule } from './context/FirestoreContextModule';

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
    ApplicationContextModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    LoginPageModule,
    RegisterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SlidesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
}
