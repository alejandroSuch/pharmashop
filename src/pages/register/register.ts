import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NavParams, Slides, ViewController } from 'ionic-angular';
import { Sex } from '../../domain/shared/Sex';
import { AddUserLastNameAction } from '../../state-management/register/actions/AddUserLastNameAction';
import { AddUserNameAction } from '../../state-management/register/actions/AddUserNameAction';
import { RegisterState, RegisterUser } from '../../state-management/register/RegisterState';
import { RegisterFormValidators } from './form/RegisterFormValidators';

const Steps = {
  WHATS_YOUR_NAME: 0,
  WHATS_YOUR_BIRTHDATE: 1
};

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  @ViewChild(Slides) slides: Slides;

  usernameForm: FormGroup;
  emailForm: FormGroup;
  sexForm: FormGroup;
  phoneNumberForm: FormGroup;
  birthDateForm: FormGroup;

  form: FormGroup;
  sex = Sex;

  private store: Store<RegisterState>;

  constructor(private navParams: NavParams,
              private fb: FormBuilder,
              private viewCtrl: ViewController,
              private appStore: Store<any>) {

    viewCtrl.setBackButtonText('Cancelar');

    this.slides.slideTo(Steps.WHATS_YOUR_NAME);

    this.store = this.appStore.select(state => <RegisterState>state.register);

    const email = this.navParams.get('email') || null;
    this.initializeForms(email);
  }

  onLoginSubmit({ value, valid }: { value: RegisterUser, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserNameAction(value.name));
    this.store.dispatch(new AddUserLastNameAction(value.lastName));
    this.slides.slideTo(Steps.WHATS_YOUR_BIRTHDATE);
  }

  private initializeForms(email: any) {
    this.usernameForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required]
    });

    this.emailForm = this.fb.group({
      email: [email, Validators.email]
    });

    this.sexForm = this.fb.group({
      sex: ['', [RegisterFormValidators.validSex, Validators.required]]
    });

    this.phoneNumberForm = this.fb.group({
      phoneNumber: [null, [Validators.required, Validators.pattern(/^(\+\d{2}\s?)?(\d{9})$/)]]
    });

    this.birthDateForm = this.fb.group({
      birthDate: [null, [Validators.required, RegisterFormValidators.isAdult]]
    });
  }

  ionViewDidLoad() {
  }

}
