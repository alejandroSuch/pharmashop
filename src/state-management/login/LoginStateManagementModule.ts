import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginEffects } from './effects/login.effects';
import { feature, loginReducers } from './reducers/login.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(feature, loginReducers),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginStateManagementModule {

}
