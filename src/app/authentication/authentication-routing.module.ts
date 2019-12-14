import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './components/authentication.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'signin',
            },
            {
                path: 'signin',
                loadChildren: () => import('./signin/signin.module')
                    .then(m => m.SignInModule)
            },
            {
                path: 'registration',
                loadChildren: () => import('./registration/registration.module')
                    .then(m => m.RegistrationModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
