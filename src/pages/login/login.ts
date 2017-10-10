import {Component} from "@angular/core";
import {AlertController, Loading, LoadingController} from "ionic-angular";
import {Store} from "@ngrx/store";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import {Subscription} from "rxjs/Subscription";
import {LoginAction} from "./login.actions";
import {LoginPageState} from "./login.reducers";
import {LoginError} from "./LoginError";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const ErrorCodes = {
  USER_NOT_FOUND: 'auth/user-not-found',
  INVALID_PASSWORD: 'auth/wrong-password'
};

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading: Loading = null;
  private loadingSubscription: Subscription = null;

  private alert;
  private alertSubscription: Subscription;

  constructor(private store: Store<any>,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {

  }

  private initializeErrorSubscription(loginPageState: Store<LoginPageState>) {
    this.alertSubscription = loginPageState
      .select('error')
      .filter(it => it !== null)
      .map((error: LoginError) => {
        this.alertCtrl
          .create({
            title: 'Error',
            subTitle: error.code,
            message: error.name,
            buttons: ['Aceptar']
          })
          .present();
      }).subscribe()
  }

  private initializeLoadingSubscription(store: Store<LoginPageState>) {
    this.loadingSubscription = store.select('loading')
      .map(showLoading => {
        if (showLoading && !this.loading) {
          this.loading = this.loadingCtrl.create({content: 'Iniciando sesión...'});
          this.loading.present();
        } else if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
      })
      .subscribe();
  }

  login(email: string, password: string) {
    this.store.dispatch(new LoginAction(email, password));
  }

  ionViewDidLoad() {
    const loginPageState: Store<LoginPageState> = this.store.select(appState => appState.loginPage);
    this.initializeLoadingSubscription(loginPageState);
    this.initializeErrorSubscription(loginPageState);
  }

  ionViewDidLeave() {
    this.alertSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

}
