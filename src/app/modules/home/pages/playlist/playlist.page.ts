import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import PlaylistSelectedEvent from 'src/app/modules/home/events/playlistSelected.event';
import { Track } from 'src/app/core/models/track.model';
import { TrackApiService } from 'src/app/core/api/track-api.service';
import TrackUploadFinished from 'src/app/core/events/trackUploadFinished.event';

@Component({
    templateUrl: './playlist.page.html',
    styleUrls: ['./playlist.page.scss']
})
export class PlaylistPage implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private eventsService: EventsService,
        private router: Router,
        private trackApiService: TrackApiService,
        private notificationsService: NotificationsService
    ) { }

    tracks: Track[];

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            const currentPlaylistId = params.get('playlistId');

            const event = new PlaylistSelectedEvent();
            event.playlistId = currentPlaylistId;

            this.eventsService.broadcast(event);

            this.updateTracks();
        });

        this.eventsService.on(TrackUploadFinished, this.updateTracks, this);
    }

    ngOnDestroy() {
        this.eventsService.off(TrackUploadFinished, this.updateTracks);
    }

    upload() {
        this.router.navigate(['upload'], { relativeTo: this.activatedRoute });
    }

    private updateTracks() {
        const currentPlaylistId = this.activatedRoute.snapshot.paramMap.get('playlistId');

        this.trackApiService.getTracksForPlaylist(currentPlaylistId)
                .subscribe(
                    (tracks) => {
                        this.tracks = tracks;
                    },
                    error => this.notificationsService.httpError('Receiving tracks', error)
                );
    }
}
