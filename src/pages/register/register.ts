import { AddUserPasswordAction } from './../../state-management/register/actions/AddUserPasswordAction';
import { AddUserEmailAction } from './../../state-management/register/actions/AddUserEmailAction';
import { AddUserPhoneNumberAction } from './../../state-management/register/actions/AddUserPhoneNumberAction';
import { AddUserBirthDateAction } from './../../state-management/register/actions/AddUserBirthDateAction';
import { AddUserSexAction } from './../../state-management/register/actions/AddUserSexAction';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NavParams, Slides, ViewController } from 'ionic-angular';
import { Sex } from '../../domain/shared/Sex';
import { AddUserLastNameAction } from '../../state-management/register/actions/AddUserLastNameAction';
import { AddUserNameAction } from '../../state-management/register/actions/AddUserNameAction';
import { RegisterState, RegisterUser } from '../../state-management/register/RegisterState';
import { RegisterFormValidators } from './form/RegisterFormValidators';

enum Steps {
  WHATS_YOUR_NAME,
  WHATS_YOUR_SEX,
  WHATS_YOUR_BIRTHDATE,
  WHATS_YOUR_PHONE_NUMBER,
  WHATS_YOUR_EMAIL,
  WHATS_YOUR_PASSWORD
};

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  @ViewChild(Slides) slides: Slides;

  form: FormGroup;
  sex = Sex;

  private store: Store<RegisterState>;

  constructor(private navParams: NavParams,
              private fb: FormBuilder,
              private appStore: Store<any>,
              viewCtrl: ViewController) {

    viewCtrl.setBackButtonText('Cancelar');

    this.store = this.appStore.select(state => <RegisterState>state.register);

    const email = this.navParams.get('email') || null;
    this.initializeForms(email);
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true); 
  }

  slideTo(index) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(index);
    this.slides.lockSwipes(true);
  }

  onUsernameSubmit({ value, valid }: { value: RegisterUser, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserNameAction(value.name));
    this.store.dispatch(new AddUserLastNameAction(value.lastName));
    this.slideTo(Steps.WHATS_YOUR_SEX);
  }

  onSexSubmit({ value, valid }: { value: RegisterUser, valid: boolean }) {
    debugger;
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserSexAction(value.sex));
    this.slideTo(Steps.WHATS_YOUR_BIRTHDATE);
  }

  onSexBack() {
    this.slideTo(Steps.WHATS_YOUR_NAME);
  }

  onBirthDateSubmit({ value, valid }: { value: RegisterUser, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserBirthDateAction(value.birthDate));
    this.slideTo(Steps.WHATS_YOUR_PHONE_NUMBER);
  }

  onBirthDateBack() {
    this.slideTo(Steps.WHATS_YOUR_SEX);
  }

  onPhoneNumberSubmit({ value, valid }: { value: RegisterUser, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserPhoneNumberAction(value.phoneNumber));
    this.slideTo(Steps.WHATS_YOUR_EMAIL);
  }

  onPhoneNumberBack() {
    this.slideTo(Steps.WHATS_YOUR_BIRTHDATE);
  }

  onEmailSubmit({ value, valid }: { value: RegisterUser, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserEmailAction(value.phoneNumber));
    this.slideTo(Steps.WHATS_YOUR_PASSWORD);
  }

  onEmailBack() {
    this.slideTo(Steps.WHATS_YOUR_PHONE_NUMBER);
  }

  onPasswordSubmit({ value, valid }: { value: RegisterUser, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserPasswordAction(value.phoneNumber));
  }

  onPasswordBack() {
    this.slideTo(Steps.WHATS_YOUR_EMAIL);
  }

  private initializeForms(email: any) {
    this.form = this.fb.group({
      usernameForm: this.fb.group({
        name: [null, Validators.required],
        lastName: [null, Validators.required]
      }),
  
      emailForm: this.fb.group({
        email: [email, Validators.email]
      }),
  
      sexForm: this.fb.group({
        sex: ['', [RegisterFormValidators.validSex, Validators.required]]
      }),
  
      phoneNumberForm: this.fb.group({
        phoneNumber: [null, [Validators.required, Validators.pattern(/^(\+\d{2}\s?)?(\d{9})$/)]]
      }),
  
      birthDateForm: this.fb.group({
        birthDate: [null, [Validators.required, RegisterFormValidators.isAdult]]
      }),
  
      passwordForm: this.fb.group({
        password: [null, [Validators.required, RegisterFormValidators.passwordsMatch('repeatPassword', true)]],
        repeatPassword: [null, [Validators.required, RegisterFormValidators.passwordsMatch('password', false)]],
      })
    });
  }
}
