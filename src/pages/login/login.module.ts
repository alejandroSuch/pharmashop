import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginStateManagementModule } from '../../state-management/login/LoginStateManagementModule';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    LoginStateManagementModule
  ]
})
export class LoginPageModule {
}
