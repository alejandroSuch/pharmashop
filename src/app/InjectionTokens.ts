import {InjectionToken} from "@angular/core";

import {Login} from "../domain/login/usecase/Login";
import {LoginService} from "../domain/login/LoginService";

export const LOGIN_SERVICE = new InjectionToken<LoginService>('LoginService');
export const LOGIN_USE_CASE = new InjectionToken<Login>('LoginUseCase');
