import { Component, OnDestroy, OnInit } from '@angular/core';

import { EventsService } from 'src/app/core/services/events.service';
import { PlayerService } from 'src/app/core/services/player.service';
import TrackPlayRequestedEvent from '../../events/trackPlayRequested.event';

@Component({
    selector: 'sma-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {
    constructor(
        private eventsService: EventsService,
        private playerService: PlayerService
    ) { }

    ngOnInit() {
        this.eventsService.on(TrackPlayRequestedEvent, this.playTrack, this);
    }

    ngOnDestroy() {
        this.eventsService.off(TrackPlayRequestedEvent, this.playTrack);
    }

    playTrack(event: TrackPlayRequestedEvent) {
        this.playerService.playTrack(event.trackId);
    }

    isPlaying() {
        return this.playerService.isPlaying();
    }

    togglePlayState() {
        this.playerService.toggle();
    }
}
