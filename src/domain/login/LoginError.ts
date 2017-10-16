import { Error } from '../shared/Error';

export class LoginError extends Error {
  constructor(public name, public code) {
    super();
  }
}
