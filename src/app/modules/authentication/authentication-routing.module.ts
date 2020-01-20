import { RouterModule, Routes } from '@angular/router';

import { AuthenticationPage } from './pages/authentication/authentication.page';
import { NgModule } from '@angular/core';
import { RegistrationPage } from './pages/registration/registration.page';
import { SignInPage } from './pages/signin/signin.page';

const routes: Routes = [
    {
        path: '',
        component: AuthenticationPage,
        children: [
            {
                path: 'signin',
                component: SignInPage
            },
            {
                path: 'registration',
                component: RegistrationPage
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'signin',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
