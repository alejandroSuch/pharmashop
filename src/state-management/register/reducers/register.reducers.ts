import { User } from '../../../domain/auth/model/User';
import { Action } from '../actions/register.actions';
import { RegisterState } from '../RegisterState';
import { ADD_USER_INFO } from './../actions/regiser.actions.constants';

const initialState: RegisterState = {};

export function registerReducers(state: RegisterState = initialState, action: Action): RegisterState {
  switch (action.type) {
    case ADD_USER_INFO:
      const user: User = Object.assign({}, state.user, action.payload);
      return { ...state, user };

    default:
      return state;
  }
}
