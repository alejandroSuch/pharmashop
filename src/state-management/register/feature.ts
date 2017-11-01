import { createFeatureSelector, Store } from '@ngrx/store';
import { RegisterState } from './RegisterState';

export const REGISTER_STORE: string = 'register';

export const registerFeatureSelector = (store: Store<any>): Store<RegisterState> => store.select(createFeatureSelector<RegisterState>(REGISTER_STORE));
