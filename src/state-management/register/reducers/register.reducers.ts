import {
  ADD_USER_BIRTHDATE,
  ADD_USER_EMAIL,
  ADD_USER_LASTNAME,
  ADD_USER_NAME,
  ADD_USER_PASSWORD,
  ADD_USER_PHONENUMBER,
  ADD_USER_SEX
} from '../actions/regiser.actions.constants';
import { RegisterState } from '../RegisterState';
import { Action } from '../actions/register.actions';

const initialState: RegisterState = {};

export const feature: string = 'register';

const updateUserProperty = (state: RegisterState, property: string, value: any): RegisterState => {
  const user = Object.assign({}, state.user, { [property]: value });
  return Object.assign({}, state, { user });
};

export function registerReducers(state: RegisterState = initialState, action: Action): RegisterState {
  switch (action.type) {
    case ADD_USER_BIRTHDATE:
      return updateUserProperty(state, 'birthDate', action.payload);
    case ADD_USER_EMAIL:
      return updateUserProperty(state, 'email', action.payload);
    case ADD_USER_LASTNAME:
      return updateUserProperty(state, 'lastName', action.payload);
    case ADD_USER_NAME:
      return updateUserProperty(state, 'name', action.payload);
    case ADD_USER_PASSWORD:
      return updateUserProperty(state, 'password', action.payload);
    case ADD_USER_PHONENUMBER:
      return updateUserProperty(state, 'phoneNumber', action.payload);
    case ADD_USER_SEX:
      return updateUserProperty(state, 'sex', action.payload);

    default:
      return state;
  }

}
