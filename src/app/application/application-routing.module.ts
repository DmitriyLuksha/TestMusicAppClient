import { RouterModule, Routes } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: ApplicationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
