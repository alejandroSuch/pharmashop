import { AddUserBirthDateAction } from './AddUserBirthDateAction';
import { AddUserEmailAction } from './AddUserEmailAction';
import { AddUserLastNameAction } from './AddUserLastNameAction';
import { AddUserPasswordAction } from './AddUserPasswordAction';
import { AddUserPhoneNumberAction } from './AddUserPhoneNumberAction';
import { AddUserSexAction } from './AddUserSexAction';

export type Action =
  AddUserBirthDateAction
  | AddUserEmailAction
  | AddUserLastNameAction
  | AddUserLastNameAction
  | AddUserPasswordAction
  | AddUserPhoneNumberAction
  | AddUserSexAction;
