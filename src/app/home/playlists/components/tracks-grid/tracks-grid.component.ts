import { Component, Input, OnInit } from '@angular/core';

import { Track } from 'src/app/core/models/track.model';

@Component({
  selector: 'sma-tracks-grid',
  templateUrl: './tracks-grid.component.html',
  styleUrls: ['./tracks-grid.component.scss']
})
export class TracksGridComponent implements OnInit {
  constructor() { }

  @Input()
  tracks: Track[];

  ngOnInit() {
  }
}
