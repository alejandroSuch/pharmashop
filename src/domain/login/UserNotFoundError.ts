import {Error} from "../shared/Error";
import {LoginCredentials} from "./LoginCredentials";

export class UserNotFoundError extends Error {
  constructor(public credentials: LoginCredentials) {
    super();
  }
}
