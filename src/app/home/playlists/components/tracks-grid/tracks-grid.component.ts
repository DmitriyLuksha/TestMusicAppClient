import { Component, Input, OnInit } from '@angular/core';

import { EventsService } from 'src/app/core/services/events.service';
import { Track } from 'src/app/core/models/track.model';
import TrackPlayRequestedEvent from 'src/app/home/events/trackPlayRequested.event';

@Component({
    selector: 'sma-tracks-grid',
    templateUrl: './tracks-grid.component.html',
    styleUrls: ['./tracks-grid.component.scss']
})
export class TracksGridComponent implements OnInit {
    constructor(
        private eventsService: EventsService
    ) { }

    @Input()
    tracks: Track[];

    ngOnInit() {
    }

    playTrack(track: Track) {
        const event = new TrackPlayRequestedEvent();
        event.trackId = track.id;

        this.eventsService.broadcast(event);
    }
}
