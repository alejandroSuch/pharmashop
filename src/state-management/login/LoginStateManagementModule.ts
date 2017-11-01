import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginEffects } from './effects/LoginEffects';
import { loginFeature, loginReducers } from './reducers/login.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(loginFeature, loginReducers),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginStateManagementModule {

}
