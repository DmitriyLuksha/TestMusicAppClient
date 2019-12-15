import { Component, OnInit } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';

import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Playlist } from 'src/app/core/models/playlist.model';
import { PlaylistApiService } from 'src/app/core/api/playlist-api.service';
import PlaylistInfoHiddenEvent from '../../events/playlistInfoHidden.event';
import PlaylistInfoShowedEvent from '../../events/playlistInfoShowed.event';
import PlaylistUpdatedEvent from 'src/app/home/events/playlistUpdated.event';
import { Router } from '@angular/router';

@Component({
    selector: 'sma-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
    constructor(
        private router: Router,
        private playlistApiService: PlaylistApiService,
        private notificationsService: NotificationsService,
        private eventsService: EventsService
    ) {
        this.playlists = [];
        this.loadPlaylists();
    }

    playlists: Playlist[];
    selectedPlaylistId: string;
    
    ngOnInit() {
        this.eventsService.on(PlaylistUpdatedEvent, this.loadPlaylists, this);
        this.eventsService.on(PlaylistInfoShowedEvent, this.onPlaylistInfoShowed, this);
        this.eventsService.on(PlaylistInfoHiddenEvent, this.onPlaylistInfoHidden, this);
    }

    ngOnDestroy() {
        this.eventsService.off(PlaylistUpdatedEvent,this.loadPlaylists);
        this.eventsService.off(PlaylistInfoShowedEvent, this.onPlaylistInfoShowed);
        this.eventsService.off(PlaylistInfoHiddenEvent, this.onPlaylistInfoHidden);
    }

    addPlaylist() {
        this.router.navigate(['/home/playlists/add']);
    }

    onPlaylistClicked(playlist: Playlist) {
        this.router.navigate(['/home/playlists/', playlist.id]);
    }

    private loadPlaylists() {
        this.playlistApiService
            .getPlaylists()
            .subscribe(
                playlists => this.playlists = playlists,
                error => this.notificationsService.httpError('Receiving playlists', error)
            );
    }

    private onPlaylistInfoShowed(event: PlaylistInfoShowedEvent) {
        this.selectedPlaylistId = event.playlistId;
    }

    private onPlaylistInfoHidden() {
        this.selectedPlaylistId = null;
    }
}
