import { CommonModule } from '@angular/common';
import { ControlsComponent } from './components/controls/controls.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NgModule } from '@angular/core';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
  declarations: [HomeComponent, MainHeaderComponent, LeftMenuComponent, ControlsComponent, UserMenuComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
