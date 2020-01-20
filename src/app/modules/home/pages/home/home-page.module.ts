import { CommonModule } from '@angular/common';
import { ControlsComponent } from './components/controls/controls.component';
import { HomePage } from './home.page';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NgModule } from '@angular/core';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaylistsListComponent } from './components/playlists-list/playlists-list.component';

@NgModule({
    declarations: [
        HomePage,
        MainHeaderComponent,
        LeftMenuComponent,
        ControlsComponent,
        UserMenuComponent,
        PlaylistsListComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        HomePage,
        FormsModule
    ]
})
export class HomePageModule { }
