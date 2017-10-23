import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { feature, registerReducers } from './reducers/register.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(feature, registerReducers)
  ]
})
export class RegisterStateManagementModule {

}
