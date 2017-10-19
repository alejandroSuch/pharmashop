import { AbstractControl } from '@angular/forms';

import moment from 'moment';
import { Sex } from '../../../domain/shared/Sex';
import { ValidationFnType } from '../../../shared/types/ValidationFnType';
import { StringUtils } from '../../../shared/util/StringUtils';

export class RegisterFormValidators {
  static validSex(control: AbstractControl): ValidationFnType {
    if (StringUtils.isEmpty(control.value)) {
      return null;
    }

    if ([Sex.FEMALE, Sex.MALE].indexOf(control.value) !== -1) {
      return null;
    } else {
      return { sex: true };
    }
  }

  static isAdult(control: AbstractControl): ValidationFnType {
    if (!(control.value instanceof Date)) {
      return null;
    }

    const isAdult: boolean = Math.abs(moment({ h: 0, m: 0, s: 0 }).diff(control.value)) > 18;

    return isAdult? null : { isAdult: true };
  }
}
