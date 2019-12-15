import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPlaylistRoutingModule } from './add-playlist-routing.module';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddPlaylistComponent],
  imports: [
    CommonModule,
    AddPlaylistRoutingModule,
    FormsModule
  ]
})
export class AddPlaylistModule { }
