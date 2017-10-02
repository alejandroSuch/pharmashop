import { config } from './../../app/firebase.config';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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

  constructor(
    private afAuth:AngularFireAuth,
    private alert:AlertController
  ) {
  }

  login(email: string, password: string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err:any) => {
        if(err.code === ErrorCodes.USER_NOT_FOUND) {
          this.askForRegistration(email)
            .then(() => this.register(email, password));
        } else {
          console.error('Error logging in', err);
        }
      });
  }

  private askForRegistration(email: string):Promise<any> {
    return new Promise((resolve, reject) => {
      const confirm = this.alert.create({
        title: 'Usuario no encontrado',
        message: `La dirección de correo <b>${email}</b> no se corresponde con ningún usuario registrado. ¿Deseas crear una cuenta?`,
        buttons: [
          { text: 'No', role: 'cancel', handler: () => reject() },
          { text: 'Sí', handler: () => resolve() }
        ]
      });
      confirm.present();
    });
  }

  private register (email: string, password: string) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user:any) => {
        console.log('registered', user);
      })
      .catch((err:any) => {
        console.error(err);
      });
    console.log('logging in', email, password);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
