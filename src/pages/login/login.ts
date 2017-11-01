import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertController, Loading, LoadingController, NavController } from 'ionic-angular';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { LoginCredentials } from '../../domain/auth/model/LoginCredentials';
import { LoginError } from '../../domain/auth/model/LoginError';
import { UserNotFoundError } from '../../domain/auth/model/UserNotFoundError';
import { DomainError } from '../../domain/shared/Error';
import { ClearErrorAction } from '../../state-management/login/actions/ClearErrorAction';
import { LoginAction } from '../../state-management/login/actions/LoginAction';
import { LoginState } from '../../state-management/login/LoginState';
import { RegisterPage } from '../register/register';
import { loginFeature } from './../../state-management/login/reducers/login.reducers';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loading: Loading = null;
  private loadingSubscription: Subscription = null;

  private alertSubscription: Subscription;

  private store: Store<LoginState>;

  constructor(private appStore: Store<any>,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController) {
    this.store = this.appStore.select(loginFeature);
  }

  login(email: string, password: string) {
    this.store.dispatch(new LoginAction(email, password));
  }

  register() {
    this.navCtrl.push(RegisterPage, { email: '' });
  }

  ionViewDidEnter() {
    this.initializeLoadingSubscription(this.store);
    this.initializeErrorSubscription(this.store);
  }

  ionViewWillLeave() {
    this.alertSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  private initializeLoadingSubscription(store: Store<LoginState>) {
    this.loadingSubscription = store.select(state => state.loading)
                                    .map(showLoading => {
                                      if (showLoading && !this.loading) {
                                        this.loading = this.loadingCtrl.create({ content: 'Iniciando sesión...' });
                                        this.loading.present();
                                      } else if (this.loading) {
                                        this.loading.dismiss();
                                        this.loading = null;
                                      }
                                    })
                                    .subscribe();
  }

  private initializeErrorSubscription(loginPageState: Store<LoginState>) {
    this.alertSubscription = loginPageState
      .select(state => state.error)
      .filter(it => it !== null)
      .map((error: Error) => this.onError(error))
      .subscribe()
  }

  private onError(error: DomainError) {
    if (error instanceof LoginError) {
      this.onGenericError(error);
    }

    if (error instanceof UserNotFoundError) {
      this.onUserNotFound(error.credentials);
    }

    this.store.dispatch(new ClearErrorAction());
  }

  private onGenericError(error: LoginError) {
    this.alertCtrl
        .create({
          title: 'Error',
          subTitle: error.code,
          message: error.name,
          buttons: ['Aceptar']
        })
        .present();
  }

  private onUserNotFound(credentials: LoginCredentials) {
    this.alertCtrl
        .create({
          title: 'Usuario no encontrado',
          message: `El usuario <b>${credentials.email}</b> no existe. ¿Deseas registrarte?`,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Aceptar',
              handler: () => {
                // this.store.dispatch(new RegisterNewUserAction(credentials));
                this.navCtrl.push(RegisterPage, { email: credentials.email });
              }
            }
          ]
        })
        .present();

  }
}
