import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module')
            .then(m => m.AuthenticationModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module')
            .then(m => m.HomeModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
