import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./application/application.module')
      .then(m => m.ApplicationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
