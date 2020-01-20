import { Component, OnInit } from '@angular/core';

import { AddPlaylistFormData } from './models/add-playlist-form-data.model';
import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { PlaylistApiService } from 'src/app/core/api/playlist-api.service';
import PlaylistUpdatedEvent from 'src/app/modules/home/events/playlistUpdated.event';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-playlist.page.html',
  styleUrls: ['./add-playlist.page.scss']
})
export class AddPlaylistPage implements OnInit {
    constructor(
        private playlistApiService: PlaylistApiService,
        private router: Router,
        private notificationsService: NotificationsService,
        private eventsService: EventsService
    ) {
        this.addPlaylistData = {
            name: null
        };
    }

    addPlaylistData: AddPlaylistFormData;

    ngOnInit() {
    }

    addPlaylist() {
        this.playlistApiService
            .addPlaylist(this.addPlaylistData.name)
            .subscribe(
                () => {
                    this.router.navigate(['/home']);

                    const event = new PlaylistUpdatedEvent();
                    this.eventsService.broadcast(event);
                },
                error => this.notificationsService.httpError('Add playlist', error)
            );
    }
}
