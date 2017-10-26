import { registerFeature } from './../../state-management/register/reducers/register.reducers';
import { AddUserInfoAction } from './../../state-management/register/actions/AddUserInfoAction';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, Slides, ViewController } from 'ionic-angular';
import { RegisterFormValidators } from './form/RegisterFormValidators';
import { RegisterState, RegisterUser } from '../../state-management/register/RegisterState';
import { Sex } from '../../domain/shared/Sex';
import { Store } from '@ngrx/store';

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
              private viewCtrl: ViewController) {

    this.store = this.appStore.select(registerFeature);

    const email = this.navParams.get('email') || null;
    this.initializeForms(email);
  }

  ngAfterViewInit() {
    this.viewCtrl.setBackButtonText('Cerrar');
    this.slides.lockSwipes(true); 
  }

  slideTo(index) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(index);
    this.slides.lockSwipes(true);
  }

  onUsernameSubmit({ value, valid }: { value: Partial<RegisterUser>, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserInfoAction({name: value.name, lastName: value.lastName }));
    this.slideTo(Steps.WHATS_YOUR_SEX);
  }

  onSexSubmit({ value, valid }: { value: Partial<RegisterUser>, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserInfoAction({sex: value.sex}));
    this.slideTo(Steps.WHATS_YOUR_BIRTHDATE);
  }

  onSexBack() {
    this.slideTo(Steps.WHATS_YOUR_NAME);
  }

  onBirthDateSubmit({ value, valid }: { value: Partial<RegisterUser>, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserInfoAction({birthDate: value.birthDate}));
    this.slideTo(Steps.WHATS_YOUR_PHONE_NUMBER);
  }

  onBirthDateBack() {
    this.slideTo(Steps.WHATS_YOUR_SEX);
  }

  onPhoneNumberSubmit({ value, valid }: { value: Partial<RegisterUser>, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserInfoAction({phoneNumber: value.phoneNumber}));
    this.slideTo(Steps.WHATS_YOUR_EMAIL);
  }

  onPhoneNumberBack() {
    this.slideTo(Steps.WHATS_YOUR_BIRTHDATE);
  }

  onEmailSubmit({ value, valid }: { value: Partial<RegisterUser>, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserInfoAction({email: value.email}));
    this.slideTo(Steps.WHATS_YOUR_PASSWORD);
  }

  onEmailBack() {
    this.slideTo(Steps.WHATS_YOUR_PHONE_NUMBER);
  }

  onPasswordSubmit({ value, valid }: { value: Partial<RegisterUser>, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.store.dispatch(new AddUserInfoAction({password: value.password}));

    if(this.form.valid) {
      // TODO: send event to save user data
    }
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
