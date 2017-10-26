import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { registerFeature, registerReducers } from './reducers/register.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(registerFeature, registerReducers)
  ]
})
export class RegisterStateManagementModule {

}
