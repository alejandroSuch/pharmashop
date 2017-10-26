import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { ErrorHandler, NgModule } from '@angular/core';
import { FirestoreContextModule } from './context/FirestoreContextModule';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LoginPageModule } from '../pages/login/login.module';
import { MyApp } from './app.component';
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
