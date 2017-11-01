import { Sex } from '../../shared/Sex';

export interface User {
  id?: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  sex: Sex;
  birthDate: Date;
  password?:string;
}
