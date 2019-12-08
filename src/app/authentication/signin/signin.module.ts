import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SignInComponent } from './signin.component';
import { SignInRoutingModule } from './signin-routing.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule
  ]
})
export class SignInModule { }
