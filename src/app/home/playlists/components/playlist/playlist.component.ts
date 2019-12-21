import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';
import PlaylistInfoHiddenEvent from 'src/app/home/events/playlistInfoHidden.event';
import PlaylistInfoShowedEvent from 'src/app/home/events/playlistInfoShowed.event';

@Component({
    selector: 'sma-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private eventsService: EventsService,
        private router: Router
    ) { }

    private previousPlaylistId: string;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.sendPlaylistInfoHiddenEvent();

            const currentPlaylistId = params.get('playlistId');

            const event = new PlaylistInfoShowedEvent();
            event.playlistId = currentPlaylistId;

            this.eventsService.broadcast(event);

            this.previousPlaylistId = currentPlaylistId;
        });
    }

    ngOnDestroy() {
        this.sendPlaylistInfoHiddenEvent();
    }

    upload() {
        this.router.navigate(['add']);
    }

    private sendPlaylistInfoHiddenEvent() {
        if (this.previousPlaylistId) {
            const event = new PlaylistInfoHiddenEvent();
            event.playlistId = this.previousPlaylistId;

            this.eventsService.broadcast(event)
        }
    }
}
