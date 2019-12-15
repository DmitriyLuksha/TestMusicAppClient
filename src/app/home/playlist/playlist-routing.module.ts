import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PlaylistComponent } from './components/playlist/playlist.component';

const routes: Routes = [{ path: '', component: PlaylistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
