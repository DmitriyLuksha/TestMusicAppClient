import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ],
})
export class ApplicationModule { }
