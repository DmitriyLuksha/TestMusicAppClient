import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';


const routes: Routes = [{ path: '', component: AddPlaylistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPlaylistRoutingModule { }
