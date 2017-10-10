import {LoginError} from "./LoginError";
import {Action} from "@ngrx/store";
import {LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LoginErrorAction, USER_NOT_FOUND} from "./login.actions";


export interface LoginPageState {
  loading: boolean;
  error: LoginError;
  userNotFound: boolean;
}

const initialState: LoginPageState = {
  loading: false,
  error: null,
  userNotFound: false
};

export function loginPageReducers(state: LoginPageState = initialState, action: Action): LoginPageState {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        userNotFound: false
      });

    case LOGIN_SUCCESS:
      return initialState;

    case USER_NOT_FOUND:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        userNotFound: true
      });

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        userNotFound: false,
        error: (<LoginErrorAction>action).payload
      });

    default:
      return state;
  }
};
