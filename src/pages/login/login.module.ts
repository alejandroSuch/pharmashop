import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LoginPage} from "./login";
import {LoginStateManagementModule} from "../../state-management/login/LoginStateManagementModule";

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    LoginStateManagementModule
  ],
})
export class LoginPageModule {
}
