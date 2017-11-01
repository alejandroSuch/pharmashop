import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { REGISTER_STORE, registerFeatureSelector } from './feature';
import { registerReducers } from './reducers/register.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(REGISTER_STORE, registerReducers)
  ],
  providers: [
    {
      provide: REGISTER_STORE,
      useFactory: registerFeatureSelector
    }
  ]
})
export class RegisterStateManagementModule {

}
