import {LoginPage} from "./../pages/login/login";
import {SlidesPage} from "./../pages/slides/slides";
import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";

import {MyApp} from "./app.component";

import {config} from "./firebase.config";
import {StoreModule} from "@ngrx/store";
import {loginPageReducers} from "../pages/login/login.reducers";
import {EffectsModule} from "@ngrx/effects";
import {LoginEffects} from "../pages/login/login.effects";

@NgModule({
  declarations: [
    MyApp,
    SlidesPage,
    LoginPage
  ],
  imports: [
    EffectsModule.forRoot([LoginEffects]),
    StoreModule.forRoot({loginPage: loginPageReducers}),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SlidesPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
