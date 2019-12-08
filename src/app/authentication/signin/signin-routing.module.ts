import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SignInComponent } from './components/signin/signin.component';

const routes: Routes = [{ path: '', component: SignInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
