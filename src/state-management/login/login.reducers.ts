import { Action } from './login.actions';
import { CLEAR_ERROR, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from './login.actions.constants';
import { LoginErrorAction } from './LoginErrorAction';
import { LoginState } from './LoginState';

const initialState: LoginState = {
  loading: false,
  error: null,
  userNotFound: false
};

export const loginFeature: string = 'login';

export function loginReducers(state: LoginState = initialState, action: Action): LoginState {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {loading: true});

    case LOGIN_SUCCESS:
      return initialState;

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: (<LoginErrorAction>action).payload
      });

    case CLEAR_ERROR: {
      return Object.assign({}, state, {error: null});
    }

    default:
      return state;
  }
}
