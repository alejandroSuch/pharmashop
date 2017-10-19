import { Error } from '../../domain/shared/Error';
import { Sex } from '../../domain/shared/Sex';

export interface RegisterState {
  user?: RegisterUser;
  error?: Error;
}

export interface RegisterUser {
  name: string;
  lastName: string;
  sex: Sex;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
}
