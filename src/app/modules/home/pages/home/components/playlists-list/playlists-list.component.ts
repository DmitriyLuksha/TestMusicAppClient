import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Playlist } from 'src/app/core/models/playlist.model';
import { Router } from '@angular/router';

@Component({
    selector: 'sma-playlists-list',
    templateUrl: './playlists-list.component.html',
    styleUrls: ['./playlists-list.component.scss']
})
export class PlaylistsListComponent implements OnInit {
    constructor(private router: Router) { }

    @Input()
    playlists: Playlist[];

    @Input()
    selectedPlaylistId: Playlist;

    @Output()
    playlistClicked = new EventEmitter<Playlist>();

    ngOnInit() {
    }

    onPlaylistClicked(playlist: Playlist) {
        this.playlistClicked.emit(playlist);
    }
}
