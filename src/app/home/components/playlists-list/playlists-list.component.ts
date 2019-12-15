import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/core/models/playlist.model';

@Component({
    selector: 'sma-playlists-list',
    templateUrl: './playlists-list.component.html',
    styleUrls: ['./playlists-list.component.scss'],
    inputs: ['playlists']
})
export class PlaylistsListComponent implements OnInit {
    constructor() { }

    playlists: Playlist[];

    ngOnInit() {
    }
}
