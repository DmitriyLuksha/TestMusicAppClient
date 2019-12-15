import { Component, OnInit } from '@angular/core';

import BaseEvent from 'src/app/core/events/base.event';
import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Playlist } from 'src/app/core/models/playlist.model';
import { PlaylistApiService } from 'src/app/core/api/playlist-api.service';
import PlaylistUpdatedEvent from 'src/app/core/events/playlistUpdated.event';
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
        private eventsService: EventsService,
    ) {
        this.playlists = [];
        this.loadPlaylists();
    }

    playlists: Playlist[];

    ngOnInit() {
        this.eventsService.on(PlaylistUpdatedEvent, this.loadPlaylists.bind(this));
    }

    ngOnDestroy() {
        this.eventsService.off(PlaylistUpdatedEvent, this.loadPlaylists.bind(this));
    }

    addPlaylist() {
        this.router.navigate(['/home/playlists/add']);
    }

    loadPlaylists() {
        this.playlistApiService
            .getPlaylists()
            .subscribe(
                (playlists) => this.playlists = playlists,
                error => this.notificationsService.httpError('Receiving playlists', error)
            );
    }
}
