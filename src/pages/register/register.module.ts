import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { RegisterStateManagementModule } from '../../state-management/register/RegisterStateManagementModule';
import { RegisterPage } from './register';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    ReactiveFormsModule,
    RegisterStateManagementModule
  ]
})
export class RegisterPageModule {
}
