import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [{ path: '', component: RegistrationComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationRoutingModule { }
