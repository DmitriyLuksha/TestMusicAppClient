import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';
import PlaylistSelectedEvent from 'src/app/home/events/playlistSelected.event';

@Component({
    selector: 'sma-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private eventsService: EventsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            const currentPlaylistId = params.get('playlistId');

            const event = new PlaylistSelectedEvent();
            event.playlistId = currentPlaylistId;

            this.eventsService.broadcast(event);
        });
    }

    upload() {
        this.router.navigate(['upload'], { relativeTo: this.activatedRoute });
    }
}
