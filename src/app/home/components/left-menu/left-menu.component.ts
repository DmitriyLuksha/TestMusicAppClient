import { Component, OnInit } from '@angular/core';

import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Playlist } from 'src/app/core/models/playlist.model';
import { PlaylistApiService } from 'src/app/core/api/playlist-api.service';
import PlaylistSelectedEvent from '../../events/playlistSelected.event';
import PlaylistUpdatedEvent from 'src/app/home/events/playlistUpdated.event';
import { Router } from '@angular/router';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import { SHOW_SELECTED_PLAYLIST } from '../../constants/route-data-keys';

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
        private routeDataService: RouteDataService
    ) {
        this.playlists = [];
        this.loadPlaylists();
    }

    playlists: Playlist[];
    selectedPlaylistId: string;
    
    ngOnInit() {
        this.eventsService.on(PlaylistUpdatedEvent, this.loadPlaylists, this);
        this.eventsService.on(PlaylistSelectedEvent, this.onPlaylistSelected, this);
    }

    ngOnDestroy() {
        this.eventsService.off(PlaylistUpdatedEvent,this.loadPlaylists);
        this.eventsService.off(PlaylistSelectedEvent, this.onPlaylistSelected);
    }

    addPlaylist() {
        this.router.navigate(['/home/playlists/add']);
    }

    onPlaylistClicked(playlist: Playlist) {
        this.router.navigate(['/home/playlists/', playlist.id]);
    }

    getSelectedPlaylistId() {
        const currentRouteData = this.routeDataService.getCurrentRouteData();
        const showSelectedPlaylistId = currentRouteData[SHOW_SELECTED_PLAYLIST];

        return showSelectedPlaylistId
            ? this.selectedPlaylistId
            : null;
    }

    private loadPlaylists() {
        this.playlistApiService
            .getPlaylists()
            .subscribe(
                playlists => this.playlists = playlists,
                error => this.notificationsService.httpError('Receiving playlists', error)
            );
    }

    private onPlaylistSelected(event: PlaylistSelectedEvent) {
        this.selectedPlaylistId = event.playlistId;
    }
}
