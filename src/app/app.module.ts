import {SlidesPage} from "./../pages/slides/slides";
import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {StoreModule} from "@ngrx/store";

import {MyApp} from "./app.component";

import {config} from "./firebase.config";
import {RegisterPage} from "../pages/register/register";
import {LoginPageModule} from "../pages/login/login.module";
import {EffectsModule} from "@ngrx/effects";
import {ApplicationContextModule} from "./context/ApplicationContextModule";

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
