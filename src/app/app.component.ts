import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TestMusicAppClient';
  notificationOptions = {
    timeOut: 5000,
    pauseOnHover: false
  }
}
