import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html'
})
export class SlidesPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}
