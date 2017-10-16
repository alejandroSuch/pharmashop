import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginEffects } from './login.effects';
import { loginFeature, loginReducers } from './login.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(loginFeature, loginReducers),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginStateManagementModule {

}
