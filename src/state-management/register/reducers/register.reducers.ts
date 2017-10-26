import { Action } from '../actions/register.actions';
import { ADD_USER_INFO } from './../actions/regiser.actions.constants';
import { RegisterState } from '../RegisterState';

const initialState: RegisterState = {};

export const registerFeature: string = 'register';

export function registerReducers(state: RegisterState = initialState, action: Action): RegisterState {
  switch (action.type) {
    case ADD_USER_INFO:
      const user = {  ...state.user, ...action.payload };
      const result = { ...state, user };
      console.log('result is', result);
      return result;

    default:
      return state;
  }
}
