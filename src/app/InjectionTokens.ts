import { InjectionToken } from '@angular/core';
import { AuthService } from '../domain/auth/service/AuthService';
import { Login } from '../domain/auth/command/Login';

export const AUTH_SERVICE = new InjectionToken<AuthService>('AuthService');
export const LOGIN_COMMAND = new InjectionToken<Login>('LoginUseCase');
export const USER_REPOSITORY = new InjectionToken<Login>('UserRepository');
export const REGISTER_USER_COMMAND = new InjectionToken<Login>('RegisterUser');
