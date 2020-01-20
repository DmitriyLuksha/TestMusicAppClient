import { AuthenticationPage } from './pages/authentication/authentication.page';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RegistrationPage } from './pages/registration/registration.page';
import { SignInPage } from './pages/signin/signin.page';

@NgModule({
    declarations: [
        AuthenticationPage,
        RegistrationPage,
        SignInPage
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        FormsModule
    ]
})
export class AuthenticationModule { }
