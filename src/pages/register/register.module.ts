import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    ReactiveFormsModule
  ]
})
export class RegisterPageModule {
}
