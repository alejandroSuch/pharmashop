import { NgModule } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { REGISTER_STORE, registerFeatureSelector } from './feature';
import { registerReducers } from './reducers/register.reducers';
import { RegisterEffects } from './effects/RegisterEffects';

@NgModule({
  imports: [
    StoreModule.forFeature(REGISTER_STORE, registerReducers),
    EffectsModule.forFeature([RegisterEffects])
  ],
  providers: [
    {
      provide: REGISTER_STORE,
      deps: [Store],
      useFactory: registerFeatureSelector
    }
  ]
})
export class RegisterStateManagementModule {

}
