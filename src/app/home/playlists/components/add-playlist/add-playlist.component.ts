import { Component, OnInit } from '@angular/core';

import { AddPlaylistFormData } from '../../models/add-playlist-form-data.model';
import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { PlaylistApiService } from 'src/app/core/api/playlist-api.service';
import PlaylistUpdatedEvent from 'src/app/home/events/playlistUpdated.event';
import { Router } from '@angular/router';

@Component({
  selector: 'sma-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.scss']
})
export class AddPlaylistComponent implements OnInit {
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
